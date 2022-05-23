import { StoreManager, IStoreAdapter } from '@fdu/store'
import { Store } from './store'

describe('test.adapter', () => {
    test('action | adapter execute', () => {
        let step = 0
        class MockAdapter implements IStoreAdapter {
            factory(_store: StoreManager, _app: any): void {
                expect(store).toStrictEqual(_store)
                step++
            }
        }
        const store: Store = new Store({ adapter: new MockAdapter() })
        // ? if 'app' params not passed in, then
        store.install()
        expect(step).toBe(0)
        store.install({}) // passed '{}' mock app.
        expect(step).toBe(1)
    })
})
