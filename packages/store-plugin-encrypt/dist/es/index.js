/** @fdu/store-plugin-encrypt
 *
 * @author halo951
 * @license MIT
 */
import{AES as r,enc as t}from"crypto-js";class e{options;constructor(r){this.options=r}transformPrepare(e,i){if(!this.options?.key)throw new Error("The required 'key' parameter is missing.");let o=e;return o=r.decrypt(o,this.options.key).toString(t.Utf8),JSON.parse(o)}transformPersistence(t,e){if(!this.options?.key)throw new Error("The required 'key' parameter is missing.");if(null==t)return t;if("object"==typeof t&&0===Object.keys(t).length)return t;let i=t;return i=r.encrypt(JSON.stringify(t),this.options.key).toString(),i}}export{e as StoreEncryptPlugin};
