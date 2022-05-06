import { StoreEncryptPlugin } from '@fdsu/store-plugin-encrypt'
import { StoreManager, StoreModule } from '@fdsu/store/src/index'
import { StoreModuleHashPlugin } from '@fdsu/store-plugin-module-hash'

/** 内存模拟缓存功能 */
class MemoryStorage implements Storage {
    [name: string]: any
    length: number

    clear(): void {
        for (const key of Object.getOwnPropertyNames(this)) {
            if (!['clear', 'length', 'getItem', 'key', 'removeItem', 'setItem'].includes(key)) {
                delete this[key]
            }
        }
    }
    getItem(key: string): string {
        return this[key] ?? undefined
    }

    key(index: number): string {
        // skip
        return ''
    }

    removeItem(key: string): void {
        delete this[key]
    }

    setItem(key: string, value: string): void {
        this[key] = value
    }
}

/**  store 插件使用测试 */
describe('plugin.test', () => {
    /** 内存缓存 */
    let memory = new MemoryStorage()

    interface ITestModel {
        val: string | null
    }

    class TestModule extends StoreModule<Store, ITestModel> {
        /** 通过 PERSISTENCE_KEYS 数组, 定义需要持久刷的属性 */
        protected PERSISTENCE_KEYS: Array<string> = ['val']

        initData(): ITestModel {
            return { val: null }
        }

        get val(): string | null {
            return this.state.val
        }
        set val(val: string | null) {
            this.$commit('val', val)
        }
    }
    class Store extends StoreManager {
        test: TestModule = new TestModule(memory)
    }

    let store: Store

    beforeEach(() => {
        // instantiation memory storage
        memory = new MemoryStorage()
        store = new Store()
        // set new storage
        store.test['storage'] = memory
        // install
        store.install()
    })

    test('persistence | 持久化数据加密', () => {
        const plugin = new StoreEncryptPlugin({ key: 'store' })
        store['plugins'] = [plugin]

        // change value
        store.test.val = 'haha'

        // check
        expect(store.test.val).toBe('haha')

        // read persistenced data.
        const cache = JSON.parse(memory.getItem('test'))

        // decrypt data
        const val: string = plugin.transformPrepare(cache.data)

        // check
        expect(JSON.stringify(val)).toBe(JSON.stringify({ val: 'haha' }))

        // reload and read
        store['ready'] = false

        store.install()

        // check
        expect(store.test.val).toBe('haha')
    })

    test('plugin | 插件聚合测试', () => {
        const moduleHashPlugin = new StoreModuleHashPlugin({ prefix: 'pre_', suffix: '_suf', hash: true })
        const encryptPlugin = new StoreEncryptPlugin({ key: 'test' })

        store['plugins'] = [moduleHashPlugin, encryptPlugin]

        // change value
        store.test.val = 'haha'

        // reload
        store['ready'] = false
        store.install()

        // check
        expect(store.test.val).toBe('haha')
    })

    // 以下是插件方法执行测试

    test('EncryptPlugin | basic', () => {
        const encryptPlugin = new StoreEncryptPlugin({ key: 'store' })
        const encrypted = encryptPlugin.transformPersistence({ val: 123 })
        const res = encryptPlugin.transformPrepare(encrypted)
        // case 1. basic value
        expect(JSON.stringify(res)).toBe(JSON.stringify({ val: 123 }))

        // case 2. 特定值
        expect(encryptPlugin.transformPersistence(null)).toBe(null)
        expect(encryptPlugin.transformPersistence(undefined)).toBe(undefined)
        expect(JSON.stringify(encryptPlugin.transformPersistence({}))).toBe(JSON.stringify({}))

        // case 3. 缺少配置
        try {
            delete encryptPlugin.options
            encryptPlugin.transformPersistence({ val: 123 })
            throw new Error('缺少 options 时, 应该抛出异常')
        } catch (error) {
            expect(error.message).toBe(`The required 'key' parameter is missing.`)
        }
        try {
            delete encryptPlugin.options
            encryptPlugin.transformPrepare(encrypted)
            throw new Error('缺少 options 时, 应该抛出异常')
        } catch (error) {
            expect(error.message).toBe(`The required 'key' parameter is missing.`)
        }
    })
})
