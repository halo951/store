import { reactive } from 'vue-demi';
export const storeSymbol = Symbol('$store');
/** vue3 inject adapter */
const Vue3Adapter = {
    register(store, app) {
        // > 通过 reactive 将 store['cache'].data 封装为可被vue观测的对象.
        store['cache'].data = reactive({ data: store['cache'].data }).data;
        // inject
        app.provide(storeSymbol, store);
        app.config.globalProperties.$store = store;
    }
};
export default Vue3Adapter;
