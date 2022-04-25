import type { IData, IStorePlugin, StoreModule } from '@cp0/store/src/index'
import {
    EObserverEvent,
    IRegisterActionAfterOptions,
    IRegisterActionBeforeOptions,
    IRegisterCommitFilterOptions,
    IRegisterPatchFilterOptions,
    IStoreObserverOptions,
    TRegisterOptions
} from './intf/event'

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

/** 事件监听集合 */
const events: Array<{ event: EObserverEvent; modules: Array<string>; options: TRegisterOptions }> = []

const register = (event: EObserverEvent, options: TRegisterOptions) => {
    let modules: Array<string> = []
    if (options.modules) {
        if (options.modules instanceof Array) {
            modules = [...options.modules]
        } else {
            modules = [options.modules]
        }
    }
    events.push({ event, modules, options })
}

/** Store观察者插件
 *
 * @description 监听 store 操作过程,
 */
export class StoreObserverPlugin implements IStorePlugin {
    constructor(options?: IStoreObserverOptions) {
        if (!options) return
        let eventName: EObserverEvent
        let event: TRegisterOptions
        for (const en in options) {
            eventName = en as EObserverEvent
            event = options[eventName] as any
            register(eventName, event)
        }
    }
    onReady(store: any): void {
        const vm: StoreObserverPlugin = this
        // # module init
        for (const moduleName of store['modules']) {
            store[moduleName] = new Proxy(store[moduleName], {
                get(mod: any, p: string, receive: any) {
                    if (/\$commit/.test(p)) {
                        vm.emit(EObserverEvent.ON_COMMIT_FILTER)
                    }
                    if (/\$patch/.test(p)) {
                        vm.emit(EObserverEvent.ON_PATCH_FILTER)
                    }
                    if (LOCK_PROPERTIES.includes(p)) return Reflect.get(mod, p, receive)
                    vm.emit(EObserverEvent.ON_ACTION_BEFORE)
                }
            })
        }
    }

    emit(event: EObserverEvent) {
        const handles: Array<TRegisterOptions> = events.filter((e) => e.event === event).map((e) => e.options)
        if (event === EObserverEvent.ON_COMMIT_FILTER) {
            for (const options of <Array<IRegisterCommitFilterOptions>>handles) {
                const { handler } = options
                console.log(handler)
            }
        }
    }
}

/** 注册 action 调用前行为监听
 *
 * @description composition api
 */
export const registerActionBeforeEvent = (options: IRegisterActionBeforeOptions): void => {
    register(EObserverEvent.ON_ACTION_BEFORE, options)
}

/** 注册 action 调用后行为监听
 *
 * @description composition api
 */
export const registerActionAfterEvent = (options: IRegisterActionAfterOptions): void => {
    register(EObserverEvent.ON_ACTION_BEFORE, options)
}

/** 注册 $commit filter 事件监听
 *
 * @description composition api
 */
export const registerCommitFilter = (options: IRegisterCommitFilterOptions): void => {
    register(EObserverEvent.ON_COMMIT_FILTER, options)
}

/** 注册 $patch filter 事件监听
 *
 * @description composition api
 */
export const registerPatchFilter = (options: IRegisterPatchFilterOptions): void => {
    register(EObserverEvent.ON_PATCH_FILTER, options)
}

export const watchStateChange = <T extends StoreModule<any, IData>>(module: T, path: string) => {}
