import type { Vue2, App as VueApp } from 'vue-demi'
import { StoreManager } from '../core/manager'
/** 向不同类型项目集成的适配器 */
export interface IStoreAdapter {
    register(store: StoreManager, app: typeof Vue2 | VueApp): void
}
