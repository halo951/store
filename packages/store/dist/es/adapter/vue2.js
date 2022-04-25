/** vue2 inject adapter */
const Vue2Adapter = {
    register($store, app) {
        // inject by mixin
        app.mixin({
            data() {
                return { $store };
            },
            beforeCreate() {
                this['$store'] = $store;
            }
        });
    }
};
export default Vue2Adapter;
