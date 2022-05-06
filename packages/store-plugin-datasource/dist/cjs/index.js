/** @fdsu/store-plugin-datasource
 *
 * @author halo951
 * @license MIT
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.StoreDatasourcePlugin=class{options;constructor(o){this.options=o}onBefore(o){if("function"!=typeof this.options?.factory)throw new Error("StoreDatasourcePlugin | This 'factory' is not a function.");const t=this.options.factory(o.cache.data);if(!t||"object"!=typeof t)throw new Error("StoreDatasourcePlugin | This 'factory' result type should be IStoreCacheData");for(const e of o.modules)if(!t[e])throw new Error(`StoreDatasourcePlugin | Missing '${e}' module data`);o.cache.data=t}};
