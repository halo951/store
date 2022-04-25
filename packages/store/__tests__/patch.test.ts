import { Store } from './store'

describe('test.patch', () => {
    let store: Store

    beforeEach(() => {
        // impl and install
        store = new Store().install()
    })

    test('patch | basic', () => {
        // origin
        expect(store.test.a).toBe('a')
        expect(store.test.b).toBe(0)
        expect(store.test.c).toBe(false)
        expect(store.test.d).toStrictEqual([1, 2, 3])
        expect(store.test.e).toStrictEqual({})
        // patch
        store.test.patch({
            a: 'target',
            b: 123,
            c: true,
            d: [1, 5, 3],
            e: { a: 1 }
        })
        // verification result
        expect(store.test.a).toBe('target')
        expect(store.test.b).toBe(123)
        expect(store.test.c).toBe(true)
        expect(store.test.d).toStrictEqual([1, 5, 3])
        expect(store.test.e).toStrictEqual({ a: 1 })
    })

    test('patch | atomicity test', () => {
        // origin
        expect(store.test.a).toBe('a')
        expect(store.test.b).toBe(0)
        expect(store.test.c).toBe(false)
        let success: boolean = false
        try {
            // patch many data, if has 1+ key is not defined, then throw error and stop commit.
            store.test.patch({
                a: 'target',
                b: 123,
                notDefined: '123'
            })
            success = true
        } catch (error) {
            // skip
            expect((error as Error).message).toBe(`$store.test ["notDefined"] is not defined.`)
        } finally {
            expect(success).toBe(false)
            // verification atomicity
            expect(store.test.a).toBe('a')
            expect(store.test.b).toBe(0)
            expect(store.test.c).toBe(false)
        }
    })

    test('patch | use object-path', () => {
        // patch Array
        store.test.patch({ d: [1, 2, 3] })
        store.test.patch({ 'd.0': 5 })
        expect(store.test.d).toStrictEqual([5, 2, 3])
        // patch object
        store.test.patch({ f: { a: 1, b: { c: 2 } } })
        store.test.patch({
            'f.a': 2,
            'f.b.c': 'fbc'
        })
        // patch result
        // f: {
        //  a: 2,
        //  b: { c：'fbc' }
        // }
        expect(store.test.f).toStrictEqual({ a: 2, b: { c: 'fbc' } })
    })

    test('patch | object and merge data.', () => {
        store.test.patch({ f: { a: 1 } })
        store.test.patch({ f: { b: 2 } }, { merge: true })
        expect(store.test.f).toStrictEqual({ a: 1, b: 2 })
    })
})
