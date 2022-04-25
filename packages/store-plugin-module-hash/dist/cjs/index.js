/** @cp0/store-plugin-module-hash
 *
 * @author halo951
 * @license MIT
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var o=require("crypto-js");exports.StoreModuleHashPlugin=class{options;constructor(o){this.options=o}transformModuleHash(s,t){if(!this.options)throw new Error("use ModuleHashPlugin should write constructor options.");let r=s;const{prefix:e,suffix:i,hash:n}=this.options;return e&&(r=e+r),i&&(r+=i),n&&(r=o.MD5(r,{}).toString(),"simple"===n&&(r=r.slice(0,6))),r}};
