import type { Vue2, App as VueApp } from 'vue-demi'
import type { IData, IStorePlugin, IStoreCache, StoreManager, StoreModule } from '@fdsu/store/src/index'

import {
    CustomInspectorNode,
    CustomInspectorState,
    DevtoolsPluginApi,
    ExtractSettingsTypes,
    PluginSettingsItem,
    setupDevtoolsPlugin
} from '@vue/devtools-api'
import { createObjectEmitter } from './utils'
import { klona } from 'klona'

type TDevToolApi = DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>

/** 插件名 */
const PLUGIN_PACKAGE_NAME: string = 'Store'

/** 插件状态类型 */
const PLUGIN_STATE_TYPE: string = 'store plugin state'

/** store node tree */
const PLUGIN_STORE_NODE_TREE_ID: string = 'org.d1t.store.NodeTree'
const PLUGIN_STORE_NODE_TREE_LABEL: string = 'Store'

/** store timeline */
const PLUGIN_STORE_TIMELINE_ID: string = 'org.d1t.store.NodeTree'
const PLUGIN_STORE_TIMELINE_LABEL: string = 'Store Timeline'

const LOCK_PROPERTIES: Array<string> = [
    '$clear',
    '$patch',
    '$commit',
    'state',
    'parent',
    'initData',
    'getData',
    'PERSISTENCE_KEYS',
    'storage',
    '__parent__'
]

/** @fdsu/store vue-devtool 支持
 *
 * @description 基于 vuejs/devtool 6.x 版本实现
 * @support
 *  1. store tree node
 *  2. 时间旅行
 *
 */
export class StoreDevtoolPlugin implements IStorePlugin {
    /** dev tool api 实例 */
    // private api!: TDevToolApi

    /** 在挂载到vue节点时, 注册 vue devTool 逻辑
     *
     * @support 支持多 vue 实例集成
     * @description 通过 DevTool 提供的 timeline, custom inspector 能力实现
     */
    onBindedToVue(store: StoreManager, app: typeof Vue2 | VueApp): void {
        setupDevtoolsPlugin(
            {
                id: 'org.d1t.store',
                packageName: PLUGIN_PACKAGE_NAME,
                label: PLUGIN_PACKAGE_NAME,
                homepage: 'https://github.com/halo951/store',
                logo: undefined,
                app: app as any,
                componentStateTypes: [PLUGIN_STATE_TYPE],
                settings: {} // 用户设置
            },
            (api: TDevToolApi): void => {
                this.registerNodeTree(store, api)
                this.registerTimeline(store, api)
            }
        )
    }

    /** 注册 node tree 功能 */
    private registerNodeTree(store: StoreManager, api: TDevToolApi): void {
        // > 添加 custom inspector, 支持预览 store node tree
        api.addInspector({
            id: PLUGIN_STORE_NODE_TREE_ID,
            label: PLUGIN_STORE_NODE_TREE_LABEL,
            icon: 'storage',
            treeFilterPlaceholder: 'search store node...',
            noSelectionText: 'no data',
            nodeActions: []
        })

        // > 添加 devTool inspector tree node 更新方法
        api.on.getInspectorTree((payload): any => {
            const isCurrent: boolean = payload.inspectorId === PLUGIN_STORE_NODE_TREE_ID
            // ? filter this app
            if (!isCurrent) return
            // store module tree data
            const moduleTreeData: Array<CustomInspectorNode> = this.generateStoreCacheNodeTree(store, payload.filter)
            // out
            payload.rootNodes = [
                // append mananger
                { id: 'manager', label: 'manager' },
                // append module status
                {
                    id: `modules`,
                    label: 'modules',
                    tags: [{ label: 'count:' + moduleTreeData.length, textColor: 0xffffff, backgroundColor: 0x444d56 }],
                    children: [...moduleTreeData]
                }
            ]
        })

        // 获取具体值方法
        api.on.getInspectorState((payload): any => {
            const isCurrent: boolean = payload.inspectorId === PLUGIN_STORE_NODE_TREE_ID
            // ? filter this app
            if (!isCurrent) return
            const [type, moduleName]: Array<string> = payload.nodeId.split('.')
            switch (type) {
                case 'manager':
                    payload.state = this.generateManagerState(store)
                    return
                case 'modules':
                    payload.state = {}
                    return
                case 'module':
                    if (moduleName) payload.state = this.generateModuleState(store, moduleName)
                    else payload.state = {}
                    return
                default:
                    payload.state = {}
                    return
            }
        })

        api.on.editInspectorState((payload): any => {
            const isCurrent: boolean = payload.inspectorId === PLUGIN_STORE_NODE_TREE_ID
            // ? filter this app
            if (!isCurrent) return
            if (payload.type === 'manager') {
                const [, moduleName] = payload.path
                const { value } = payload.state
                const path: Array<any> = payload.path.slice(2)
                ;(store as any)[moduleName].commit(path, value)
            }
            if (payload.type === 'state') {
                const moduleName: string = payload.nodeId.split(/\./)[1]
                const { value } = payload.state
                ;(store as any)[moduleName].commit(payload.path, value)
            }
        })
    }

    /** 生成当前 store cache 的 nodeTree 集合
     * @param {string|undefined} query 过滤条件
     */
    private generateStoreCacheNodeTree(store: StoreManager, query: string | undefined): Array<CustomInspectorNode> {
        const cache: IStoreCache = store['cache']
        const rootNodes: Array<string> = Object.keys(cache.keys)

        return rootNodes
            .map((key: string): CustomInspectorNode => {
                return { id: 'module.' + key, label: key }
            })
            .filter((node: CustomInspectorNode) => {
                if (!query) return true
                const reg: RegExp = new RegExp(query)
                if (reg.test(node.label)) return true
                if (reg.test(JSON.stringify(this.generateModuleState(store, node.label)))) return true
                return false
            })
    }

    /** 生成 StoreManager preview 属性 */
    private generateManagerState(store: StoreManager): CustomInspectorState {
        const plugins: Array<IStorePlugin> = store['plugins']
        return {
            manager: [
                { key: 'version', value: store['options'].version },
                { key: 'cache', value: store['cache'].data, editable: true },
                { key: 'plugins', value: plugins.map((plugin) => (plugin as any).__proto__.constructor.name) }
            ]
        }
    }

    /** 生成 module state */
    private generateModuleState(store: StoreManager, moduleName: string): CustomInspectorState {
        const module: StoreModule<StoreManager, IData> = (store as any)[moduleName]
        const state = module['state']
        const props = Object.getOwnPropertyNames((module as any).__proto__).map((key) => {
            return { key, value: null }
        })
        return {
            getter: props
                .filter((p) => {
                    const sys: boolean = ['constructor', 'initData'].indexOf(p.key) !== -1
                    const isFun: boolean = typeof (module as any)[p.key] === 'function'
                    return !(sys || isFun)
                })
                .map((item) => {
                    item.value = (module as any)[item.key]
                    return item
                }),
            state: Object.keys(state).map((key: string) => {
                return { key, value: state[key], editable: true }
            }),
            options: [
                {
                    key: 'PERSISTENCE_KEYS',
                    value: module['PERSISTENCE_KEYS']
                }
            ]
        }
    }
    /** 安装 时间旅行 功能 */
    private registerTimeline(store: StoreManager, api: TDevToolApi): void {
        // > 创建快照
        const createSnapshot = (): { [key: string]: IData } => klona(store['cache'].data)
        // > 添加 timeline, 支持时间旅行功能
        api.addTimelineLayer({
            id: PLUGIN_STORE_TIMELINE_ID,
            label: PLUGIN_STORE_TIMELINE_LABEL,
            color: 0xea3ced
        })
        // > 创建 object change emitter, 监听状态变化
        createObjectEmitter(store['cache'].data, (target: any, key: string | Symbol, value: any) => {
            // > push event
            api.addTimelineEvent({
                layerId: PLUGIN_STORE_TIMELINE_ID,
                event: {
                    time: Date.now(),
                    data: {
                        change: {
                            target,
                            key,
                            value
                        },
                        snapshot: createSnapshot()
                    },
                    logType: 'default',
                    meta: {},
                    title: 'state change',
                    subtitle: ''
                }
            })
        })
        // 创建 actions 行为调用监听
        let createInvokeActionLog = (options: IActionLog) => {
            const { moduleName, action, beforeSnapshot, afterSnapshot, error, sync } = options
            api.addTimelineEvent({
                layerId: PLUGIN_STORE_TIMELINE_ID,
                event: {
                    time: Date.now(),
                    logType: !error ? 'default' : 'error',
                    title: 'invoke action',
                    subtitle: moduleName + '.' + action + ' - is' + !error ? 'success' : 'failure',
                    data: {
                        module: moduleName,
                        action,
                        sync,
                        beforeSnapshot,
                        afterSnapshot
                    }
                }
            })
        }
        // # module init
        for (const moduleName of store['modules']) {
            ;(store as any)[moduleName] = new Proxy((store as any)[moduleName], {
                get(mod: any, p: string, receive: any) {
                    if (LOCK_PROPERTIES.includes(p)) return Reflect.get(mod, p, receive)
                    if (typeof mod[p] !== 'function') return Reflect.get(mod, p, receive)
                    let origin: Function = mod[p]
                    let res: any
                    let options: IActionLog = {
                        moduleName,
                        action: p,
                        sync: true,
                        beforeSnapshot: createSnapshot(),
                        afterSnapshot: createSnapshot(),
                        error: null,
                        res: undefined
                    }
                    return function () {
                        try {
                            res = origin.call(mod, arguments)
                            if (res instanceof Promise) {
                                res.catch((e) => {
                                    options.error = e
                                    throw e
                                }).finally(() => {
                                    options.sync = false
                                    options.afterSnapshot = createSnapshot()
                                    createInvokeActionLog(options)
                                })
                            } else {
                                options.res = res
                                options.afterSnapshot = createSnapshot()
                                createInvokeActionLog(options)
                            }
                            return res
                        } catch (error) {
                            options.afterSnapshot = createSnapshot()
                            options.error = error as Error
                            createInvokeActionLog(options)
                            throw error
                        }
                    }
                }
            })
        }
    }
}

interface IActionLog {
    moduleName: string
    action: string
    sync: boolean
    beforeSnapshot: any
    afterSnapshot: any
    error?: Error | null | undefined
    res?: any
}
