/** @cp0/store-plugin-observer
 *
 * @author halo951
 * @license MIT
 */
var t;!function(t){t.ON_ACTION_BEFORE="onActionBefore",t.ON_ACTION_AFTER="onActionAfter",t.ON_COMMIT_FILTER="onCommitFilter",t.ON_PATCH_FILTER="onPatchFilter"}(t||(t={}));const o=["$clear","$patch","$commit","state","parent","initData","getData","PERSISTENCE_KEYS","storage","__parent__"],e=[],n=(t,o)=>{let n=[];o.modules&&(n=o.modules instanceof Array?[...o.modules]:[o.modules]),e.push({event:t,modules:n,options:o})};class _{constructor(t){if(!t)return;let o,e;for(const _ in t)o=_,e=t[o],n(o,e)}onReady(e){const n=this;for(const _ of e.modules)e[_]=new Proxy(e[_],{get(e,_,s){if(/\$commit/.test(_)&&n.emit(t.ON_COMMIT_FILTER),/\$patch/.test(_)&&n.emit(t.ON_PATCH_FILTER),o.includes(_))return Reflect.get(e,_,s);n.emit(t.ON_ACTION_BEFORE)}})}emit(o){const n=e.filter((t=>t.event===o)).map((t=>t.options));if(o===t.ON_COMMIT_FILTER)for(const t of n){const{handler:o}=t;console.log(o)}}}const s=o=>{n(t.ON_ACTION_BEFORE,o)},O=o=>{n(t.ON_ACTION_BEFORE,o)},c=o=>{n(t.ON_COMMIT_FILTER,o)},i=o=>{n(t.ON_PATCH_FILTER,o)},r=(t,o)=>{};export{_ as StoreObserverPlugin,O as registerActionAfterEvent,s as registerActionBeforeEvent,c as registerCommitFilter,i as registerPatchFilter,r as watchStateChange};
