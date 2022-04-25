import { IStorePlugin, StoreManager } from '@cp0/store'
import type { Vue2, App as VueApp } from 'vue-demi'

import { TestModule } from './store/modules/TestModule'

describe('test.plugin', () => {
    class NullStorePlugin implements IStorePlugin {}
    class StorePlugin implements IStorePlugin {
        store!: Store
        onBeforeInit?(store: StoreManager): void {
            this.store = store as Store
            this.store.step++
        }
        onReady?(_store: StoreManager): void {
            this.store.step++
        }
        onBindedToVue?(store: StoreManager, app: typeof Vue2 | VueApp): void {
            this.store.step++
        }
        transformModuleHash?(moduleName: string, originName?: string): string {
            return moduleName
        }
        transformPrepare?(data: any, origin?: any): any {
            return data
        }
        transformPersistence?(data: any, origin?: any): any {
            return data
        }
    }
    class Store extends StoreManager {
        // 通过这个变量判断 Store 生命周期到了哪个阶段
        step: number = 0
        plugins: Array<IStorePlugin> = [new StorePlugin()]
        test: TestModule = new TestModule()
    }
    class Store1 extends StoreManager {
        step: number = 0
        plugins: Array<IStorePlugin> = [new NullStorePlugin()]
        test: TestModule = new TestModule()
    }
    let store: Store

    test('plugin | plugin life test', () => {
        store = new Store()
        // mock store install and not install to vue
        expect(store.step).toBe(0)
        store.install()
        // init first install, trigger `onBeforeInit` and `onReady`
        expect(store.step).toBe(2)
        // if repeat install, then skip `store.init()` life, not trigger event `onBeforeInit` or `onReady`.
        store.install()
        // use vue-demi plugin,vue app is dummy variable, so mock `vue app(3.x)` for test.
        const app: any = { provide() {}, config: { globalProperties: {} } }
        // execute Vue.use(store), trigger.
        store.install(app)
        expect(store.step).toBe(3)
    })
    test('plugin | plugin transformModuleHash test', () => {
        store = new Store()
        expect(store['generateModuleHash']('test')).toBe('test')
    })

    test('plugin | use not defined event plugin', () => {
        store = new Store1()
        expect(store.step).toBe(0)
        store.install()
        expect(store.step).toBe(0)
        store.install()
        const app: any = { provide() {}, config: { globalProperties: {} } }
        store.install(app)
        expect(store.step).toBe(0)
    })
})
