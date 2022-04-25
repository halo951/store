import type { Vue2 } from 'vue-demi'
import type { StoreManager } from '../core/manager'
import type { IStoreAdapter } from '../intf/adapter.intf'

/** vue2 inject adapter */
const Vue2Adapter: IStoreAdapter = {
    register($store: StoreManager, app: typeof Vue2): void {
        // inject by mixin
        app.mixin({
            data() {
                return { $store }
            },
            beforeCreate() {
                this['$store'] = $store
            }
        })
    }
}

export default Vue2Adapter
