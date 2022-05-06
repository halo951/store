/** @fdsu/store-adapter-vue3
 *
 * @author halo951
 * @license MIT
 */
import{reactive as o}from"vue-demi";const e=Symbol("$store");class r{globalPropertyKey="$store";constructor(o){o?.globalPropertyKey&&(this.globalPropertyKey=o.globalPropertyKey)}factory(r,t){r.cache.data=o({data:r.cache.data}).data,t.provide(e,r),t.config.globalProperties[this.globalPropertyKey]=r}}export{r as default,e as storeSymbol};
