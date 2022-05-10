import { Vue2Adapter } from '../src'
import { Store } from './store'
describe('test.vue (satisfied coverage)', () => {
    test('install | Vue2 > Vue.use', async () => {
        const store = new Store({ adapter: new Vue2Adapter() })
        let mockVue2: any = {
            use(plugin: any) {
                plugin.install(mockVue2)
            },
            mixin(opt: any) {
                // use merge mock Vue command.
                mockVue2 = { ...mockVue2, ...opt }
            }
        }

        mockVue2.use(store)
        mockVue2.beforeCreate()
        const data: any = mockVue2.data()
        expect(data['$store']).toStrictEqual(store)
        expect(mockVue2.$store).toStrictEqual(store)
    })
})

export {}
