import { StoreManager } from '@cp0/store'
import { reactive } from 'vue'
import { acceptHMRUpdate } from './hmr'
import { User2Module } from './modules/User2Module'
import { UserModule } from './modules/UserModule'

export default class Store extends StoreManager {
    user1: UserModule = new UserModule()
    user2: User2Module = new User2Module()
    $id: any = Date.now()
    constructor(opt: any) {
        super(opt)
        console.log(121344554)
    }
}

export const store = new Store({
    adapter: {
        factory(store, app) {
            // > 通过 reactive 将 store['cache'].data 封装为可被vue观测的对象.
            store['cache'].data = reactive({ data: store['cache'].data }).data
            // inject
            app.provide(Symbol('store'), store)
            app.config.globalProperties.$store = store
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
}
