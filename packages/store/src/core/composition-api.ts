import { IStoreOptions } from 'src/intf/options.intf'
import { IData } from '../intf/data.intf'
import { StoreManager } from './manager'
import { StoreModule } from './module'

class Manager extends StoreManager {}
/** 定义一个公共的数据源 */
const manager: Manager & { [key: string]: StoreModule | any } = new Manager()

export const createModule = <T extends StoreModule>(moduleName: string, mod: T): T => {
    manager[moduleName] = mod
    return mod
}

export class TestModule extends StoreModule<IData> {
    protected initData(): IData {
        return {}
    }

    a() {}
}

/** test 模块 */
const test: TestModule = createModule('test', new TestModule())

export const createStore = <M extends { [key: string]: StoreModule } = {}>(modules: M, options?: IStoreOptions): M => {
    return modules
}

const store = createStore({
    user: new TestModule()
})

store.user
