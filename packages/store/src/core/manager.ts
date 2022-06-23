import set from 'set-value'
import { klona } from 'klona'

import type { IStoreCache } from '../intf/cache.intf'
import type { IStorePlugin } from '../intf/plugin.intf'
import type { IData } from '../intf/data.intf'
import type { IStoreOptions } from '../intf/options.intf'
import type { Options } from 'set-value'

import { StoreModule } from './module'
import { getFirstPropKey, requiredFunctionDefined } from '../utils'

/** StoreManager */
export abstract class StoreManager {
    /** store options */
    protected options!: IStoreOptions

    /** 是否初始化完成 */
    private ready?: boolean

    /** 缓存/数据源 */
    private readonly cache: IStoreCache = { keys: {}, data: {} }

    /** get all module name */
    private get modules(): Array<string> {
        return Object.keys(this).filter((key) => {
            return (this as any)[key] instanceof StoreModule
        })
    }

    constructor(options?: IStoreOptions) {
        this.options = { version: '1.0.0', ...this.options, ...options }
    }

    /** 安装
     *
     * @description 允许脱离 vue 单独使用, 但脱离 vue 使用时, 需要先执行 store.install() 操作.
     * @support 支持 vue2.x, vue3.x, 及独立使用.
     */
    public install(app?: any): this {
        if (this.ready) return this
        // > emit plugin binded to vue event
        this.emit((plugin: IStorePlugin) => plugin.onBefore?.(this))
        let model: StoreModule<IData, this>
        // # module init
        for (const moduleName of this.modules) {
            model = (this as any)[moduleName]
            // ? check initData is defined
            requiredFunctionDefined(`$store.${moduleName}`, model, ['initData'])

            // > inject
            this.injectFactory(moduleName, model)

            // init module data
            this.prepare(moduleName, model)
        }

        this.ready = true

        // emit store ready event.
        this.emit((plugin: IStorePlugin) => plugin.onReady?.(this))

        // ? 支持抛开vue使用
        if (!app) return this
        // register to target use adapter. basic: vue2, vue3
        if (this.options.adapter) this.options.adapter.factory(this, app)
        // > emit plugin binded to vue event
        this.emit((plugin: IStorePlugin) => plugin.onBinded?.(this, app))
        return this
    }

    /** 清除模块数据并重新初始化
     *
     * @param {Array<string>} specifyModules 可选, 不填则清除所有数据
     */
    public $clear(specifyModules?: Array<string>): void {
        specifyModules = specifyModules ?? this.modules

        if (!(specifyModules instanceof Array)) throw new Error('$store.clear() should be passed into Array.')

        let model: StoreModule<IData, this>
        // # 逐个清理, 还原数据
        for (const moduleName of specifyModules) {
            model = (this as any)[moduleName]
            // init origin data.
            this.cache.data[moduleName] = model['initData']()
            // 持久化
            this.persistence(moduleName, model)
        }
    }

    /** calc module hash
     *
     * @description transform origin module name to `module hsah`, and be used for data storage.
     */
    private generateModuleSign(moduleName: string): string {
        // > transform module hash by plugin
        return this.emit((plugin: IStorePlugin, latest: string, origin: string) => {
            if (plugin.transformSign) return plugin.transformSign(latest, origin)
            else return latest
        }, moduleName)
    }

    /** injectFactory
     *
     * @description use function mapping realization StoreModule abstract function.
     */
    private injectFactory(moduleName: string, model: StoreModule<IData, this>) {
        const ERROR_PREFIX: string = `$store.${moduleName} `
        model['__parent__'] = this

        // # inject Function 'getData'
        model['getData'] = () => {
            return this.cache.data[moduleName] ?? {}
        }

        // # inject Function 'commit'
        model['$commit'] = (key: Array<string | number> | string, value: unknown, options?: Options) => {
            const firstObjectPath: string = getFirstPropKey(key)

            // ? 校验commit key第一位是否是预定义字段
            if (!this.cache.keys[moduleName].includes(firstObjectPath)) {
                throw new Error(ERROR_PREFIX + `'${firstObjectPath}' is not defined.`)
            }

            // > update value
            set(this.cache.data[moduleName], key as Array<string>, value, options)

            // # 指定数据持久化
            this.persistence(moduleName, model)
        }

        // # inject Function '$patch'
        model['$patch'] = (data: IData, options?: Options) => {
            if (!data) {
                throw new Error(ERROR_PREFIX + `$patch must has 'data'.`)
            }

            if (typeof data !== 'object' || data instanceof Array) {
                throw new Error(ERROR_PREFIX + `$patch's data should is IData.`)
            }

            // diff not defined prop
            const notDefindProp: Array<string> = Object.keys(data)
                .map((key) => getFirstPropKey(key))
                .filter((key) => !this.cache.keys[moduleName].includes(key))

            // ? check prop is defined.
            if (notDefindProp.length > 0) {
                throw new Error(ERROR_PREFIX + `${JSON.stringify(notDefindProp)} is not defined.`)
            }

            // execute change
            for (const key in data) {
                set(this.cache.data[moduleName], key, data[key], options)
            }

            // # 指定数据持久化
            this.persistence(moduleName, model)
        }

        // # inject Function 'clear'
        model['$clear'] = () => this.$clear([moduleName])
    }

    /** data prepare */
    private prepare(moduleName: string, model: StoreModule<IData, this>): void {
        const NAME_HASH: string = this.generateModuleSign(moduleName)
        // hacker: use ['key'] skip ts check.
        const dataStr: string | null = model['storage']?.getItem(NAME_HASH) ?? null
        const origin: IData = model['initData']()
        let persistenceData: IData = {}

        if (dataStr) {
            const body: IData = JSON.parse(dataStr)
            if (body?.version === this.options.version) {
                // on prepare, transform persistenced data by plugin
                persistenceData = this.emit((plugin: IStorePlugin, latest: any, origin: any) => {
                    if (plugin.transformPrepare) return plugin.transformPrepare(latest, origin)
                    else return latest
                }, body.data)
            }
        }

        // cache keys
        this.cache.keys[moduleName] = Object.keys(origin)
        // cache data: merge initData() result and persitenced data.
        this.cache.data[moduleName] = { ...origin, ...persistenceData }

        // # re persistence
        this.persistence(moduleName, model)
    }

    /** data persistence */
    private persistence(moduleName: string, model: StoreModule<IData, this>): void {
        const NAME_HASH = this.generateModuleSign(moduleName)
        const origin = this.cache.data[moduleName]
        const storage: Storage = model['storage']
        const PERSISTENCE_KEYS: Array<string> = model['PERSISTENCE_KEYS']

        let data: IData | string = {}

        // ? check need to skip
        if (!storage || !PERSISTENCE_KEYS) return

        let isPersistenced: boolean
        // normalize peristence data
        for (const key in origin) {
            isPersistenced = PERSISTENCE_KEYS.includes(key) && origin[key] !== undefined
            // ? check is persistence prop, then set to cache data.
            // ! notes: undefined not write
            if (isPersistenced && origin[key] !== undefined) data[key] = origin[key]
        }

        // > on persistence, transform origin data by plugin
        data = this.emit((plugin: IStorePlugin, latest: any, origin: any) => {
            if (plugin.transformPersistence) return plugin.transformPersistence(latest, origin)
            else return latest
        }, data)

        // generate body and set version.
        const body = { data, version: this.options.version }

        // ? 对应缺少待存储数据时, 清理 storage
        if (data === undefined || data === null || (typeof data === 'object' && Object.keys(data).length === 0)) {
            // > clear cache data
            storage.removeItem(NAME_HASH)
        } else {
            // > set to storage
            storage.setItem(NAME_HASH, JSON.stringify(body))
        }
    }

    /** 向插件推送生命周期变化 */
    private emit<T>(handle: (plugin: IStorePlugin, latest: T, origin: T) => void, origin: any = undefined): any | void {
        // # copy origin data
        let latest: any = klona(origin)
        // ? if unuse plugin, skip
        if (!(this.options.plugins instanceof Array)) return latest

        // > loop recursion
        for (const plugin of this.options.plugins) {
            latest = handle(plugin, latest, origin)
        }

        return latest
    }
}
