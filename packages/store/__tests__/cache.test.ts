import { Store } from './store'

describe('test.cache', () => {
    let store: Store

    beforeEach(() => {
        // impl and install
        store = new Store().install()
    })
    test("cache | verification StoreModule defined IDataModel is mapped StoreManager['cache'] .", () => {
        expect(store.test['state']).toStrictEqual(store['cache'].data['test'])
        expect(Object.keys(store.test['state'])).toStrictEqual(store['cache'].keys['test'])
        expect(store.test['getData']()).toStrictEqual(store['cache'].data['test'])
    })

    test('cache | satisfy coverage', () => {
        expect(store.test['parent']).toStrictEqual(store)
    })
})
