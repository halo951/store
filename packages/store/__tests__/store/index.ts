import { StoreManager } from '@fdu/store'

import { TestModule } from './modules/TestModule'

export class Store extends StoreManager {
    test: TestModule = new TestModule()
    test2: TestModule = new TestModule()
}
