import { Vue3Adapter } from '../src'
import { Store } from './store'
import { mount } from '@vue/test-utils'

describe('test.vue (satisfied coverage)', () => {
    let store: Store
    let Component: any
    beforeEach(() => {
        store = new Store({ adapter: new Vue3Adapter() })
    })
    test('vue3 | $commit reactive', async () => {
        Component = {
            template: `
              <div>
                <button @click="add" />
                Count: {{ count }}
              </div>
            `,
            computed: {
                count() {
                    return store.test.b
                }
            },
            methods: {
                add() {
                    store.test.b++
                }
            }
        }

        const wrapper = mount(Component, {
            global: {
                plugins: [store]
            }
        })
        await wrapper.find('button').trigger('click')
        expect(wrapper.html()).toContain('Count: 1')
    })

    test('vue3 | global propeties', () => {
        Component = {
            template: `
              <div>
                Count: {{ count }}
              </div>
            `,
            computed: {
                count() {
                    return (this as any).$store.test.b
                }
            },
            methods: {}
        }

        const wrapper = mount(Component, {
            global: {
                plugins: [store]
            }
        })
        expect(wrapper.html()).toContain('Count: 0')
    })
})

export {}
