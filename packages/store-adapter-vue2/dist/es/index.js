/** @fdsu/store-adapter-vue2
 *
 * @author halo951
 * @license MIT
 */
class o{globalPropertyKey="$store";constructor(o){o?.globalPropertyKey&&(this.globalPropertyKey=o.globalPropertyKey)}factory(o,r){r.observable(o.cache.data),r.prototype[this.globalPropertyKey]=o}}export{o as Vue2Adapter};
