import { Store } from './store'

describe('test.action', () => {
    let store: Store

    beforeEach(() => {
        // impl and install
        store = new Store().install()
    })
    test('action | execute action', () => {
        store.test.setA('haha')
        expect(store.test.getA()).toBe('haha')
        expect(store.test['parent'].test2.getA()).toBe('a')
    })
})
