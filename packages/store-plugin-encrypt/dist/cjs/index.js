/** @fdsu/store-plugin-encrypt
 *
 * @author halo951
 * @license MIT
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("crypto-js");exports.StoreEncryptPlugin=class{options;constructor(e){this.options=e}transformPrepare(r,t){if(!this.options?.key)throw new Error("The required 'key' parameter is missing.");let s=r;return s=e.AES.decrypt(s,this.options.key).toString(e.enc.Utf8),JSON.parse(s)}transformPersistence(r,t){if(!this.options?.key)throw new Error("The required 'key' parameter is missing.");if(null==r)return r;if("object"==typeof r&&0===Object.keys(r).length)return r;let s=r;return s=e.AES.encrypt(JSON.stringify(r),this.options.key).toString(),s}};
