import { IStoreAdapter, IStorePlugin, StoreManager } from '@fdu/store'
import type { Vue2, App as VueApp } from 'vue-demi'

import { TestModule } from './store/modules/TestModule'

describe('test.plugin', () => {
    class MockAdapter implements IStoreAdapter {
        factory() {
            /** skip */
        }
    }
    class NullStorePlugin implements IStorePlugin {}
    class StorePlugin implements IStorePlugin {
        store!: Store
        onBefore?(store: StoreManager): void {
            this.store = store as Store
            this.store.step++
        }
        onReady?(_store: StoreManager): void {
            this.store.step++
        }
        onBinded?(store: StoreManager, app: typeof Vue2 | VueApp): void {
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
        test: TestModule = new TestModule()
    }
    class Store1 extends StoreManager {
        step: number = 0
        test: TestModule = new TestModule()
    }
    let store: Store

    test('plugin | plugin life test', () => {
        store = new Store({
            adapter: new MockAdapter(),
            plugins: [new StorePlugin()]
        })
        // mock store install and not install to vue
        expect(store.step).toBe(0)
        store.install()
        // init first install, trigger `onBefore` and `onReady`
        expect(store.step).toBe(2)
        // if repeat install, then skip `store.init()` life, not trigger event `onBefore` or `onReady`.
        store.install()
        // execute Vue.use(store), trigger. q
        store.install({})
        expect(store.step).toBe(3)
    })
    test('plugin | plugin generateModuleSign test', () => {
        store = new Store({ plugins: [new StorePlugin()] })
        expect(store['generateModuleSign']('test')).toBe('test')
    })

    test('plugin | use not defined event plugin', () => {
        const store1 = new Store1({
            adapter: new MockAdapter(),
            plugins: [new NullStorePlugin()]
        })
        expect(store1.step).toBe(0)
        store1.install()
        expect(store1.step).toBe(0)
        store1.install()
        const app: any = { provide() {}, config: { globalProperties: {} } }
        store1.install(app)
        expect(store1.step).toBe(0)
    })
})
