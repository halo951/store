import { StoreManager } from '../core/manager'

export interface IStoreAdapter {
    /** adapter 工厂方法, 提供向不同平台下注册store的实现.
     *
     * @param {Store} store store root
     * @param app
     */
    factory(store: StoreManager, app: any): void
}
