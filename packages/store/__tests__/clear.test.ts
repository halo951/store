import { Store } from './store'

describe('test.clear (StoreManager.clear, StoreModule.clear)', () => {
    let store: Store

    beforeEach(() => {
        // impl and install
        store = new Store().install()
    })

    test('clear | StoreManager.clear all', () => {
        // mock data change
        store.test.commit('a', '345')
        store.test.commit('b', 324)
        store.test.commit('c', false)

        store.test2.commit('a', '123123')
        store.test2.commit('b', 123)
        store.test2.commit('c', true)
        // clear
        store.$clear()

        // verification result
        expect(store.test.a).toBe('a')
        expect(store.test.b).toBe(0)
        expect(store.test.c).toBe(false)

        // verification result
        expect(store.test2.a).toBe('a')
        expect(store.test2.b).toBe(0)
        expect(store.test2.c).toBe(false)
    })

    test('clear | StoreManager.clear by module name', () => {
        // mock data change
        store.test.commit('a', '345')
        store.test.commit('b', 324)
        store.test.commit('c', false)

        store.test2.commit('a', '123123')
        store.test2.commit('b', 123)
        store.test2.commit('c', true)
        // clear
        store.$clear(['test2'])

        // verification result
        expect(store.test.a).toBe('345')
        expect(store.test.b).toBe(324)
        expect(store.test.c).toBe(false)

        // verification result
        expect(store.test2.a).toBe('a')
        expect(store.test2.b).toBe(0)
        expect(store.test2.c).toBe(false)
    })

    test('clear | StoreModule.clear', () => {
        // mock data change
        store.test.commit('a', '345')
        store.test.commit('b', 324)
        store.test.commit('c', false)

        // clear (use hacker skip protected prop)
        store.test['$clear']()

        // verification result
        expect(store.test.a).toBe('a')
        expect(store.test.b).toBe(0)
        expect(store.test.c).toBe(false)
    })
})
