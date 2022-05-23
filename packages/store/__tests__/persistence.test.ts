import { IData, StoreManager } from '@fdu/store'

import { MemoryStorage } from './store/MemberStorage'
import { TestModule } from './store/modules/TestModule'

/** store 持久化能力测试
 *
 *
 * @description 持久化能力对 视图控制, 与逻辑控制进行分离. store 的能力用来维护逻辑能力而非操作视图数据.
 *    在逻辑能力(业务场景)中, 我们会将数据状态归类为应用数据、用户数据以及其他一些数据状态. 不同的数据状态存在不同的生命周期。
 *    而不同生命周期的数据, 需要保存的时效不同.
 *    举个例子, 用户登录记录的保存时效, 应该是尽可能的延长, 那么我们在保存时, 应持久化到 localStorage 中,
 *    然后是一些用户登录后产生的数据, 如: 用户资料这些只在本次登录内使用, 那么他应该持久化到sessionStorage中
 *    还有一些实时数据, 则应该只保存到内存中, 用户页面刷新或退出后, 即失效.
 */
describe('test.persistence', () => {
    /** 内存缓存 */
    let memory: MemoryStorage
    let store: Store
    const VERSION: string = '1.0.0'
    class Test1Model extends TestModule {
        // appoint persistence prop.
        PERSISTENCE_KEYS: Array<string> = ['a', 'b', 'd']
    }

    class Store extends StoreManager {
        test: Test1Model = new Test1Model(memory)
        test2: Test1Model = new Test1Model()
    }

    beforeEach(() => {
        memory = new MemoryStorage()
        store = new Store({ version: VERSION })
        expect(store.test['storage']).toBe(memory)
    })

    test('persistence | prepare data by initData', () => {
        // install and initData()
        store.install()
        expect(store.test.a).toBe('a')
    })
    test('persistence | prepare data by initData and storaged data.', () => {
        // if memory has cache, then prepare data by merge { ...initData(), ...persistence data }
        memory.setItem('test', JSON.stringify({ data: { a: 'haha' }, version: VERSION }))
        store.install()
        expect(store.test.a).toBe('haha')
    })
    test('persistence | commit data and persistence', () => {
        store.install()
        store.test.commit('a', 'haha')
        // verification storage data
        let testStorageData: { data: IData; version: string } = JSON.parse(memory.getItem('test'))
        expect(testStorageData.data.a).toStrictEqual('haha')
        // reload
        store = new Store({ version: VERSION })
        store.install()
        expect(store.test.a).toBe('haha')
    })

    test('persistence | commit or patch many data (has persistence and unpersistence data)', () => {
        store.install()
        store.test.patch({ a: 'test', b: 123, d: [3, 2, 5] })
        // reload
        store = new Store({ version: VERSION })
        store.install()
        expect(store.test.a).toBe('test')
        expect(store.test.b).toBe(123)
        expect(store.test.c).toBe(false)
        expect(store.test.d).toStrictEqual([3, 2, 5])
    })

    // if has 2+ Store, need to append `StoreModuleHashPlugin`, and set prefix or set suffix change module hash.
    test('persistence | clear persistence data', () => {
        store.install()
        store.test.patch({ a: 'test', b: 123, d: [3, 2, 5] })
        expect(store.test.a).toBe('test')
        expect(store.test.b).toBe(123)
        expect(store.test.d).toStrictEqual([3, 2, 5])
        // clear
        store.$clear()
        expect(store.test.a).toBe('a')
        expect(store.test.b).toBe(0)
        expect(store.test.d).toStrictEqual([1, 2, 3])
        // reload
        store = new Store({ version: VERSION })
        store.install()
        expect(store.test.a).toBe('a')
        expect(store.test.b).toBe(0)
        expect(store.test.d).toStrictEqual([1, 2, 3])
    })
    test('persistence | update Store version and restart storage data.', () => {
        store.install()
        store.test.patch({ a: 'test', b: 123, d: [3, 2, 5] })
        // reload
        store = new Store({ version: '2.0.0' }) // old version is 1.0.0, and change version trigger reset data.
        store.install()
        expect(store.test.a).toBe('a')
        expect(store.test.b).toBe(0)
        expect(store.test.d).toStrictEqual([1, 2, 3])
    })

    test('persistence | set PERSISTENCE_KEYS and not set Storage', () => {
        // install and initData()
        store.install()
        store.test2.commit('a', 'haha')

        // reload
        store = new Store()
        store.install()

        expect(store.test2.a).toBe('a')
    })
})
