import { Store } from './store'

describe('test.install', () => {
    let store: Store

    beforeEach(() => {
        // impl and install
        store = new Store()
    })

    test('install | initData()', () => {
        store.install()
        expect(store['ready']).toBe(true)
        expect(store['modules']).toStrictEqual(['test', 'test2'])
        expect(store.test.a).toBe('a')
        expect(store.test.b).toBe(0)
        expect(store.test.c).toBe(false)
        expect(store.test.d).toStrictEqual([1, 2, 3])
        expect(store.test.e).toStrictEqual({})
        expect(store.test.f).toBe(null)
    })

    test('install | life is uninstall, visit StoreModule.state is undefined', () => {
        expect(store.test['state']).toBe(undefined)
        let throwError: boolean = false
        try {
            store.test.a
        } catch (error) {
            throwError = true
        } finally {
            expect(throwError).toBe(true)
        }
    })

    test('install | commit security test when store is not initialized', () => {
        let throwError: boolean = false
        try {
            // if not install, then `commit` and `patche` will be discarded.
            // and there will be no hint
            store.test.commit('a', '123123')
            store.test.patch({ ccdd: 'asdf' })

            store.install()
            expect(store.test.a).toBe('a')

            store.test.commit('a', 'b')
            expect(store.test.a).toBe('b')

            // mock clear, also invalid
            store = new Store()
            store.test['$clear']()
        } catch (error) {
            throwError = true
        } finally {
            expect(throwError).toBe(false)
        }
    })
})
