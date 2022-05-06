import { IStorePlugin, StoreManager } from '@fdsu/store/src/index'
import { TestModule } from './modules/TestModule'
import { StoreDatasourcePlugin } from '@fdsu/store-plugin-datasource'

export class Store extends StoreManager {
    plugin: Array<IStorePlugin> = [
        new StoreDatasourcePlugin({
            factory: (origin) => {
                return new Proxy(origin, {
                    get(t, p, r) {
                        return Reflect.get(t, p, r)
                    },
                    set(t, p, v, r) {
                        return Reflect.set(t, p, v, r)
                    }
                })
            }
        })
    ]
    test: TestModule = new TestModule()
}
