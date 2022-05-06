import { StoreManager, IStorePlugin } from '@fdsu/store'
import { reactive } from 'vue'
import { User2Module } from './modules/User2Module'
import { UserModule } from './modules/UserModule'
import { createStoreViteHMRProxy, acceptHMRUpdate } from './plugin'

export default class Store extends StoreManager {
    user1: UserModule = new UserModule()
    user2: User2Module = new User2Module()

    constructor(opt: any) {
        super(opt)
        console.log('constructor')
    }
}

export const store = createStoreViteHMRProxy(
    new Store({
        adapter: {
            factory(store: any, app: any) {
                // > 通过 reactive 将 store['cache'].data 封装为可被vue观测的对象.
                store['cache'] = reactive({ cache: store['cache'] }).cache
                // inject
                app.provide(Symbol('store'), store)
                app.config.globalProperties.$store = store
            }
        }
    })
)
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate())
}
