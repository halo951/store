import { Store } from './store'
describe('store.StoreDatasourcePlugin', () => {
    let store: Store
    beforeEach(() => {
        store = new Store()
    })
    test('verification plug-in validity', () => {
        let throwError: boolean = false
        try {
            store.install()
        } catch (error) {
            throwError = true
        } finally {
            expect(throwError).toBe(false)
        }
    })
    test('verification plug-in change state', () => {
        // change string
        expect(store.test.a).toBe(null)
        store.test.a = 'haha'
        expect(store.test.a).toBe('haha')

        // change array
        expect(store.test.b).toStrictEqual([])
        store.test.b = [1, 2, 3]
        expect(store.test.b).toStrictEqual([1, 2, 3])
        store.test.push(4)
        expect(store.test.b).toStrictEqual([1, 2, 3, 4])

        // change object
        expect(store.test.c).toStrictEqual({ n: '123' })
        store.test.c = { a: 1 }
        expect(store.test.c).toStrictEqual({ a: 1 })
        store.test.set('b', 2)
        expect(store.test.c).toStrictEqual({ a: 1, b: 2 })
    })
})
