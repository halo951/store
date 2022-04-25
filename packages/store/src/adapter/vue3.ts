import * as VueDemi from 'vue-demi' // use hacker import
import type { StoreManager } from '../core/manager'
import type { IStoreAdapter } from '../intf/adapter.intf'

export const storeSymbol = Symbol('$store')

/** vue3 inject adapter */
const Vue3Adapter: IStoreAdapter = {
    register(store: StoreManager, app: VueDemi.App): void {
        // > 通过 reactive 将 store['cache'].data 封装为可被vue观测的对象.
        store['cache'].data = VueDemi.reactive({ data: store['cache'].data }).data
        // inject
        app.provide(storeSymbol, store)
        app.config.globalProperties.$store = store
    }
}

export default Vue3Adapter
