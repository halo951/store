import { StoreManager, StoreModule } from '@fdsu/store/src/index'
import { StoreModuleHashPlugin } from '@fdsu/store-plugin-module-hash'
import { MD5 } from 'crypto-js'

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

    class TestModule extends StoreModule<ITestModel, Store> {
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

    test('plugin | module-hash.prefix', () => {
        const plugin = new StoreModuleHashPlugin({ prefix: 'prefix_' })
        store['plugins'] = [plugin]

        // change value
        store.test.val = 'haha'

        // check
        expect(memory.getItem('prefix_test')).toBe(JSON.stringify({ data: { val: 'haha' }, version: '1.0.0' }))
    })

    test('plugin | module-hash.suffix', () => {
        const plugin = new StoreModuleHashPlugin({ suffix: '_suffix' })
        store['plugins'] = [plugin]

        // change value
        store.test.val = 'haha'

        // check
        expect(memory.getItem('test_suffix')).toBe(JSON.stringify({ data: { val: 'haha' }, version: '1.0.0' }))
    })

    test('plugin | module-hash.hash', () => {
        const plugin = new StoreModuleHashPlugin({ hash: true })
        store['plugins'] = [plugin]

        // change value
        store.test.val = 'haha'

        // check
        expect(memory.getItem(MD5('test').toString())).toBe(JSON.stringify({ data: { val: 'haha' }, version: '1.0.0' }))
    })

    test('plugin | module-hash.hash (simple)', () => {
        // simple hash 唯一性测试, 请参考: [./redundancy.test.ts] -> `simple hash only test`
        const plugin = new StoreModuleHashPlugin({ prefix: 'ss_', hash: 'simple' })

        class SimpleStore extends StoreManager {
            plugins = [plugin]
            test: TestModule = new TestModule(memory)
            test1: TestModule = new TestModule(memory)
            test2: TestModule = new TestModule(memory)
        }
        const ss = new SimpleStore({ version: '1.2.2' })
        // install
        ss.install()
        // change value
        ss.test.val = 'haha'
        ss.test1.val = 'haha'
        ss.test2.val = 'haha'

        // check
        expect(memory.getItem(MD5('ss_test').toString().slice(0, 6))).not.toBe(undefined)
        expect(memory.getItem(MD5('ss_test').toString().slice(0, 6))).not.toBe(undefined)
        expect(memory.getItem(MD5('ss_test').toString().slice(0, 6))).not.toBe(undefined)
    })

    test('ModuleHashPlugin | basic', () => {
        const moduleHashPlugin = new StoreModuleHashPlugin({})
        try {
            delete moduleHashPlugin.options
            moduleHashPlugin.transformModuleHash('module')
            throw new Error('缺少 options 时, 应该抛出异常')
        } catch (error) {
            expect(error.message).toBe(`use ModuleHashPlugin should write constructor options.`)
        }
    })

    test('ModuleHashPlugin | check value', () => {
        const pluginForLang = new StoreModuleHashPlugin({ hash: 'lang' })
        const pluginForSimple = new StoreModuleHashPlugin({ hash: 'simple' })
        // check
        expect(pluginForSimple.transformModuleHash('test').length).toBe(6)
        expect(pluginForSimple.transformModuleHash('test')).toBe(MD5('test').toString().slice(0, 6))
        expect(pluginForLang.transformModuleHash('test')).toBe(MD5('test').toString())
    })
})
