/** @cp0/store-plugin-module-hash
 *
 * @author halo951
 * @license MIT
 */
import{MD5 as o}from"crypto-js";class s{options;constructor(o){this.options=o}transformModuleHash(s,t){if(!this.options)throw new Error("use ModuleHashPlugin should write constructor options.");let r=s;const{prefix:i,suffix:n,hash:e}=this.options;return i&&(r=i+r),n&&(r+=n),e&&(r=o(r,{}).toString(),"simple"===e&&(r=r.slice(0,6))),r}}export{s as StoreModuleHashPlugin};
