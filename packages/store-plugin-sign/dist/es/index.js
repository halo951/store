/** @fdu/store-plugin-module-hash
 *
 * @author halo951
 * @license MIT
 */
import{MD5 as o}from"crypto-js";class t{options;constructor(o){this.options=o}transformSign(t,s){if(!this.options)throw new Error("use ModuleHashPlugin should write constructor options.");let r=t;const{prefix:i,suffix:n,hash:e}=this.options;return i&&(r=i+r),n&&(r+=n),e&&(r=o(r,{}).toString(),"simple"===e&&(r=r.slice(0,6))),r}}export{t as StoreModuleHashPlugin};
