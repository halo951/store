import { StoreManager } from '@fdu/store'

import { TestModule } from './modules/TestModule'

export class Store extends StoreManager {
    test: TestModule = new TestModule()
    test2: TestModule = new TestModule()
}

const createModule = (storage?: Storage) => {
    class Store extends StoreManager {
        mod: TestModule = new TestModule(storage)
    }
    return new Store().mod
}
export const useTsetModule = createModule()
