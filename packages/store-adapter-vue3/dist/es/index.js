/** @fdu/store-adapter-vue3
 *
 * @author halo951
 * @license MIT
 */
import{reactive as o}from"vue-demi";const r=Symbol("$store");class e{globalPropertyKey="$store";constructor(o){o?.globalPropertyKey&&(this.globalPropertyKey=o.globalPropertyKey)}factory(e,t){e.cache.data=o({data:e.cache.data}).data,t.provide(r,e),t.config.globalProperties[this.globalPropertyKey]=e}}export{e as Vue3Adapter,r as storeSymbol};
