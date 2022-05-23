/** @fdu/store-adapter-vue2
 *
 * @author halo951
 * @license MIT
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.Vue2Adapter=class{globalPropertyKey="$store";constructor(e){e?.globalPropertyKey&&(this.globalPropertyKey=e.globalPropertyKey)}factory(e,r){r.observable(e.cache.data),r.prototype[this.globalPropertyKey]=e}};
