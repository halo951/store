import type { Vue2, App as VueApp } from 'vue-demi'
/** vue plugin use api support */
export interface IVuePlugin {
    /** vue2 plugin install api
     *
     * @description Vue 2.x plugin's [install] params is Vue Object. so used 'any' on type.
     */
    install(__vue: typeof Vue2): any
    /** vue3 plugin install api */
    install(app: VueApp, ...options: any[]): any
}
