/** @fdsu/store-adapter-vue3
 *
 * @author halo951
 * @license MIT
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("vue-demi");const r=Symbol("$store");exports.Vue3Adapter=class{globalPropertyKey="$store";constructor(e){e?.globalPropertyKey&&(this.globalPropertyKey=e.globalPropertyKey)}factory(o,t){o.cache.data=e.reactive({data:o.cache.data}).data,t.provide(r,o),t.config.globalProperties[this.globalPropertyKey]=o}},exports.storeSymbol=r;
