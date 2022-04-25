/** @cp0/store-plugin-datasource
 *
 * @author halo951
 * @license MIT
 */
class o{options;constructor(o){this.options=o}onBeforeInit(o){if("function"!=typeof this.options?.factory)throw new Error("StoreDatasourcePlugin | This 'factory' is not a function.");const t=this.options.factory(o.cache.data);if(!t||"object"!=typeof t)throw new Error("StoreDatasourcePlugin | This 'factory' result type should be IStoreCacheData");for(const r of o.modules)if(!t[r])throw new Error(`StoreDatasourcePlugin | Missing '${r}' module data`);o.cache.data=t}}export{o as StoreDatasourcePlugin};
