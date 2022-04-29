import { Store } from './store'

describe('test.commit', () => {
    let store: Store

    beforeEach(() => {
        // impl and install
        store = new Store().install()
    })

    test('commit | $commit', () => {
        store.test.commit('a', 'changed')
        expect(store.test.a).toBe('changed')
        store.test.commit('b', 123)
        expect(store.test.b).toBe(123)
        store.test.commit('c', true)
        expect(store.test.c).toBe(true)
        store.test.commit('d', [1, 3, 2, 4])
        expect(store.test.d).toStrictEqual([1, 3, 2, 4])

        // note: 特殊情况, commit 不校验参数类型, 需要参数类型校验时, 需要通过 setter 使用ts特性实现.
        store.test.commit('b', 'string')
        expect(store.test.b).toBe('string')

        // note: 特殊情况, IData 中, key 使用了 `a.b` 样式的 key 写法. 需要通过添加(\\)分隔符方式提交值. 如: `a\\.b`
        store.test.commit('a\\.b', '123')
    })

    test('commit | $commit filter key test', () => {
        const test = () => store.test.commit('non', 'val')
        expect(test).toThrow(new Error("$store.test 'non' is not defined."))
    })

    test('commit | $commit change data use `object-path`', () => {
        let origin = { a: { c: 1 } }
        store.test.commit('e', JSON.parse(JSON.stringify(origin)))
        expect(store.test.e).toStrictEqual(origin)
        store.test.commit('e.a.c', [1, 2, 3])
        expect(store.test.e.a.c).toStrictEqual([1, 2, 3])
        store.test.commit('e.a', 123)
        expect(store.test.e.a).toStrictEqual(123)
    })

    test('commit | $commit change array use `object-path`', () => {
        store.test.commit('d', [1, 2, 3])
        expect(store.test.d).toStrictEqual([1, 2, 3])
        // 变更数组值, 通过 key.[index] 格式, 如: d.1
        store.test.commit('d.1', 5)
        expect(store.test.d).toStrictEqual([1, 5, 3])
        store.test.commit('d', { arr: [1, 2, 3] })
        store.test.commit('d.arr.1', 5)
        expect(store.test.d).toStrictEqual({ arr: [1, 5, 3] })
    })

    test('basic | $commit object and merge data.', () => {
        store.test.commit('f', { a: 1 })
        store.test.commit('f', { b: 2 }, { merge: true })
        expect(store.test.f).toStrictEqual({ a: 1, b: 2 })
    })
})
