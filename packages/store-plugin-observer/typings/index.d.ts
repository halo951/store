import type { IStorePlugin } from '@cp0/store/src/index'
import {
    EObserverEvent,
    IRegisterActionAfterOptions,
    IRegisterActionBeforeOptions,
    IRegisterCommitFilterOptions,
    IRegisterPatchFilterOptions,
    IStoreObserverOptions
} from './intf/event'
/** Store观察者插件
 *
 * @description 监听 store 操作过程,
 */
export declare class StoreObserverPlugin implements IStorePlugin {
    constructor(options?: IStoreObserverOptions)
    onReady(store: any): void
    emit(event: EObserverEvent): void
}
/** 注册 action 调用前行为监听
 *
 * @description composition api
 */
export declare const registerActionBeforeEvent: (options: IRegisterActionBeforeOptions) => void
/** 注册 action 调用后行为监听
 *
 * @description composition api
 */
export declare const registerActionAfterEvent: (options: IRegisterActionAfterOptions) => void
/** 注册 $commit filter 事件监听
 *
 * @description composition api
 */
export declare const registerCommitFilter: (options: IRegisterCommitFilterOptions) => void
/** 注册 $patch filter 事件监听
 *
 * @description composition api
 */
export declare const registerPatchFilter: (options: IRegisterPatchFilterOptions) => void
