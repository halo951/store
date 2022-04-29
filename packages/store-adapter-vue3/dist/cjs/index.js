/** @cp0/store-adapter-vue3
 *
 * @author halo951
 * @license MIT
 */
"use strict";function e(n){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(n)}function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function t(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||i(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,n){if(e){if("string"==typeof e)return a(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?a(e,n):void 0}}function a(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function c(e,n){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=i(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,u=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return c=e.done,e},e:function(e){u=!0,a=e},f:function(){try{c||null==t.return||t.return()}finally{if(u)throw a}}}}var u,s;function l(e,n){for(var t=Object.create(null),r=e.split(","),o=0;o<r.length;o++)t[r[o]]=!0;return n?function(e){return!!t[e.toLowerCase()]}:function(e){return!!t[e]}}function f(e){if(k(e)){for(var n={},t=0;t<e.length;t++){var r=e[t],o=R(r)?v(r):f(r);if(o)for(var i in o)n[i]=o[i]}return n}return R(e)||C(e)?e:void 0}Object.defineProperty(exports,"__esModule",{value:!0}),r(u={},1,"TEXT"),r(u,2,"CLASS"),r(u,4,"STYLE"),r(u,8,"PROPS"),r(u,16,"FULL_PROPS"),r(u,32,"HYDRATE_EVENTS"),r(u,64,"STABLE_FRAGMENT"),r(u,128,"KEYED_FRAGMENT"),r(u,256,"UNKEYED_FRAGMENT"),r(u,512,"NEED_PATCH"),r(u,1024,"DYNAMIC_SLOTS"),r(u,2048,"DEV_ROOT_FRAGMENT"),r(u,-1,"HOISTED"),r(u,-2,"BAIL"),r(s={},1,"STABLE"),r(s,2,"DYNAMIC"),r(s,3,"FORWARDED");var p=/;(?![^(]*\))/g,d=/:(.+)/;function v(e){var n={};return e.split(p).forEach((function(e){if(e){var t=e.split(d);t.length>1&&(n[t[0].trim()]=t[1].trim())}})),n}function h(e){var n="";if(R(e))n=e;else if(k(e))for(var t=0;t<e.length;t++){var r=h(e[t]);r&&(n+=r+" ")}else if(C(e))for(var o in e)e[o]&&(n+=o+" ");return n.trim()}var y="production"!==process.env.NODE_ENV?Object.freeze({}):{};"production"===process.env.NODE_ENV||Object.freeze([]);var g,_,m,b=function(){},E=/^on[^a-z]/,w=function(e){return E.test(e)},N=Object.assign,O=function(e,n){var t=e.indexOf(n);t>-1&&e.splice(t,1)},S=Object.prototype.hasOwnProperty,V=function(e,n){return S.call(e,n)},k=Array.isArray,D=function(e){return"[object Map]"===P(e)},x=function(e){return"function"==typeof e},R=function(e){return"string"==typeof e},j=function(n){return"symbol"===e(n)},C=function(n){return null!==n&&"object"===e(n)},A=Object.prototype.toString,P=function(e){return A.call(e)},T=function(e){return P(e).slice(8,-1)},M=function(e){return R(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e},I=(g=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},_=Object.create(null),function(e){return _[e]||(_[e]=g(e))}),F=function(e,n){return!Object.is(e,n)};function $(e){for(var n,t=arguments.length,r=new Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];(n=console).warn.apply(n,["[Vue warn] ".concat(e)].concat(r))}function U(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:undefined;n&&n.active&&n.effects.push(e)}var z,H=function(e){var n=new Set(e);return n.w=0,n.n=0,n},L=function(e){return(e.w&B)>0},W=function(e){return(e.n&B)>0},K=new WeakMap,Y=0,B=1,G=Symbol("production"!==process.env.NODE_ENV?"iterate":""),q=Symbol("production"!==process.env.NODE_ENV?"Map key iterate":""),J=function(){function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2?arguments[2]:void 0;n(this,e),this.fn=t,this.scheduler=r,this.active=!0,this.deps=[],this.parent=void 0,U(this,o)}var r,o,i;return r=e,(o=[{key:"run",value:function(){if(!this.active)return this.fn();for(var e=z,n=Q;e;){if(e===this)return;e=e.parent}try{return this.parent=z,z=this,Q=!0,B=1<<++Y,Y<=30?function(e){var n=e.deps;if(n.length)for(var t=0;t<n.length;t++)n[t].w|=B}(this):X(this),this.fn()}finally{Y<=30&&function(e){var n=e.deps;if(n.length){for(var t=0,r=0;r<n.length;r++){var o=n[r];L(o)&&!W(o)?o.delete(e):n[t++]=o,o.w&=~B,o.n&=~B}n.length=t}}(this),B=1<<--Y,z=this.parent,Q=n,this.parent=void 0,this.deferStop&&this.stop()}}},{key:"stop",value:function(){z===this?this.deferStop=!0:this.active&&(X(this),this.onStop&&this.onStop(),this.active=!1)}}])&&t(r.prototype,o),i&&t(r,i),Object.defineProperty(r,"prototype",{writable:!1}),e}();function X(e){var n=e.deps;if(n.length){for(var t=0;t<n.length;t++)n[t].delete(e);n.length=0}}var Q=!0,Z=[];function ee(){Z.push(Q),Q=!1}function ne(){var e=Z.pop();Q=void 0===e||e}function te(e,n,t){if(Q&&z){var r=K.get(e);r||K.set(e,r=new Map);var o=r.get(t);o||r.set(t,o=H()),function(e,n){var t=!1;Y<=30?W(e)||(e.n|=B,t=!L(e)):t=!e.has(z);t&&(e.add(z),z.deps.push(e),"production"!==process.env.NODE_ENV&&z.onTrack&&z.onTrack(Object.assign({effect:z},n)))}(o,"production"!==process.env.NODE_ENV?{effect:z,target:e,type:n,key:t}:void 0)}}function re(e,n,t,r,i,a){var u=K.get(e);if(u){var s=[];if("clear"===n)s=o(u.values());else if("length"===t&&k(e))u.forEach((function(e,n){("length"===n||n>=r)&&s.push(e)}));else switch(void 0!==t&&s.push(u.get(t)),n){case"add":k(e)?M(t)&&s.push(u.get("length")):(s.push(u.get(G)),D(e)&&s.push(u.get(q)));break;case"delete":k(e)||(s.push(u.get(G)),D(e)&&s.push(u.get(q)));break;case"set":D(e)&&s.push(u.get(G))}var l="production"!==process.env.NODE_ENV?{target:e,type:n,key:t,newValue:r,oldValue:i,oldTarget:a}:void 0;if(1===s.length)s[0]&&("production"!==process.env.NODE_ENV?oe(s[0],l):oe(s[0]));else{var f,p=[],d=c(s);try{for(d.s();!(f=d.n()).done;){var v=f.value;v&&p.push.apply(p,o(v))}}catch(e){d.e(e)}finally{d.f()}"production"!==process.env.NODE_ENV?oe(H(p),l):oe(H(p))}}}function oe(e,n){var t,r=c(k(e)?e:o(e));try{for(r.s();!(t=r.n()).done;){var i=t.value;(i!==z||i.allowRecurse)&&("production"!==process.env.NODE_ENV&&i.onTrigger&&i.onTrigger(N({effect:i},n)),i.scheduler?i.scheduler():i.run())}}catch(e){r.e(e)}finally{r.f()}}var ie=l("__proto__,__v_isRef,__isVue"),ae=new Set(Object.getOwnPropertyNames(Symbol).map((function(e){return Symbol[e]})).filter(j)),ce=pe(),ue=pe(!0),se=pe(!0,!0),le=fe();function fe(){var e={};return["includes","indexOf","lastIndexOf"].forEach((function(n){e[n]=function(){for(var e=en(this),t=0,r=this.length;t<r;t++)te(e,"get",t+"");for(var i=arguments.length,a=new Array(i),c=0;c<i;c++)a[c]=arguments[c];var u=e[n].apply(e,a);return-1===u||!1===u?e[n].apply(e,o(a.map(en))):u}})),["push","pop","shift","unshift","splice"].forEach((function(n){e[n]=function(){ee();for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var o=en(this)[n].apply(this,t);return ne(),o}})),e}function pe(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return function(t,r,o){if("__v_isReactive"===r)return!e;if("__v_isReadonly"===r)return e;if("__v_isShallow"===r)return n;if("__v_raw"===r&&o===(e?n?Ke:We:n?Le:He).get(t))return t;var i=k(t);if(!e&&i&&V(le,r))return Reflect.get(le,r,o);var a=Reflect.get(t,r,o);return(j(r)?ae.has(r):ie(r))?a:(e||te(t,"get",r),n?a:on(a)?!i||!M(r)?a.value:a:C(a)?e?Be(a):Ye(a):a)}}function de(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return function(n,t,r,o){var i=n[t];if(Xe(i)&&on(i)&&!on(r))return!1;if(!e&&!Xe(r)&&(Qe(r)||(r=en(r),i=en(i)),!k(n)&&on(i)&&!on(r)))return i.value=r,!0;var a=k(n)&&M(t)?Number(t)<n.length:V(n,t),c=Reflect.set(n,t,r,o);return n===en(o)&&(a?F(r,i)&&re(n,"set",t,r,i):re(n,"add",t,r)),c}}var ve={get:ce,set:de(),deleteProperty:function(e,n){var t=V(e,n),r=e[n],o=Reflect.deleteProperty(e,n);return o&&t&&re(e,"delete",n,void 0,r),o},has:function(e,n){var t=Reflect.has(e,n);return j(n)&&ae.has(n)||te(e,"has",n),t},ownKeys:function(e){return te(e,"iterate",k(e)?"length":G),Reflect.ownKeys(e)}},he={get:ue,set:function(e,n){return"production"!==process.env.NODE_ENV&&$('Set operation on key "'.concat(String(n),'" failed: target is readonly.'),e),!0},deleteProperty:function(e,n){return"production"!==process.env.NODE_ENV&&$('Delete operation on key "'.concat(String(n),'" failed: target is readonly.'),e),!0}},ye=N({},he,{get:se}),ge=function(e){return e},_e=function(e){return Reflect.getPrototypeOf(e)};function me(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=en(e=e.__v_raw),i=en(n);n!==i&&!t&&te(o,"get",n),!t&&te(o,"get",i);var a=_e(o),c=a.has,u=r?ge:t?rn:tn;return c.call(o,n)?u(e.get(n)):c.call(o,i)?u(e.get(i)):void(e!==o&&e.get(n))}function be(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=this.__v_raw,r=en(t),o=en(e);return e!==o&&!n&&te(r,"has",e),!n&&te(r,"has",o),e===o?t.has(e):t.has(e)||t.has(o)}function Ee(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e=e.__v_raw,!n&&te(en(e),"iterate",G),Reflect.get(e,"size",e)}function we(e){e=en(e);var n=en(this);return _e(n).has.call(n,e)||(n.add(e),re(n,"add",e,e)),this}function Ne(e,n){n=en(n);var t=en(this),r=_e(t),o=r.has,i=r.get,a=o.call(t,e);a?"production"!==process.env.NODE_ENV&&ze(t,o,e):(e=en(e),a=o.call(t,e));var c=i.call(t,e);return t.set(e,n),a?F(n,c)&&re(t,"set",e,n,c):re(t,"add",e,n),this}function Oe(e){var n=en(this),t=_e(n),r=t.has,o=t.get,i=r.call(n,e);i?"production"!==process.env.NODE_ENV&&ze(n,r,e):(e=en(e),i=r.call(n,e));var a=o?o.call(n,e):void 0,c=n.delete(e);return i&&re(n,"delete",e,void 0,a),c}function Se(){var e=en(this),n=0!==e.size,t="production"!==process.env.NODE_ENV?D(e)?new Map(e):new Set(e):void 0,r=e.clear();return n&&re(e,"clear",void 0,void 0,t),r}function Ve(e,n){return function(t,r){var o=this,i=o.__v_raw,a=en(i),c=n?ge:e?rn:tn;return!e&&te(a,"iterate",G),i.forEach((function(e,n){return t.call(r,c(e),c(n),o)}))}}function ke(e,n,t){return function(){var o=this.__v_raw,i=en(o),a=D(i),c="entries"===e||e===Symbol.iterator&&a,u="keys"===e&&a,s=o[e].apply(o,arguments),l=t?ge:n?rn:tn;return!n&&te(i,"iterate",u?q:G),r({next:function(){var e=s.next(),n=e.value,t=e.done;return t?{value:n,done:t}:{value:c?[l(n[0]),l(n[1])]:l(n),done:t}}},Symbol.iterator,(function(){return this}))}}function De(e){return function(){if("production"!==process.env.NODE_ENV){var n=(arguments.length<=0?void 0:arguments[0])?'on key "'.concat(arguments.length<=0?void 0:arguments[0],'" '):"";console.warn("".concat(I(e)," operation ").concat(n,"failed: target is readonly."),en(this))}return"delete"!==e&&this}}function xe(){var e={get:function(e){return me(this,e)},get size(){return Ee(this)},has:be,add:we,set:Ne,delete:Oe,clear:Se,forEach:Ve(!1,!1)},n={get:function(e){return me(this,e,!1,!0)},get size(){return Ee(this)},has:be,add:we,set:Ne,delete:Oe,clear:Se,forEach:Ve(!1,!0)},t={get:function(e){return me(this,e,!0)},get size(){return Ee(this,!0)},has:function(e){return be.call(this,e,!0)},add:De("add"),set:De("set"),delete:De("delete"),clear:De("clear"),forEach:Ve(!0,!1)},r={get:function(e){return me(this,e,!0,!0)},get size(){return Ee(this,!0)},has:function(e){return be.call(this,e,!0)},add:De("add"),set:De("set"),delete:De("delete"),clear:De("clear"),forEach:Ve(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((function(o){e[o]=ke(o,!1,!1),t[o]=ke(o,!0,!1),n[o]=ke(o,!1,!0),r[o]=ke(o,!0,!0)})),[e,t,n,r]}var Re,je,Ce=(je=4,function(e){if(Array.isArray(e))return e}(Re=xe())||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,i=[],a=!0,c=!1;try{for(t=t.call(e);!(a=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==t.return||t.return()}finally{if(c)throw o}}return i}}(Re,je)||i(Re,je)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),Ae=Ce[0],Pe=Ce[1],Te=Ce[2],Me=Ce[3];function Ie(e,n){var t=n?e?Me:Te:e?Pe:Ae;return function(n,r,o){return"__v_isReactive"===r?!e:"__v_isReadonly"===r?e:"__v_raw"===r?n:Reflect.get(V(t,r)&&r in n?t:n,r,o)}}var Fe={get:Ie(!1,!1)},$e={get:Ie(!0,!1)},Ue={get:Ie(!0,!0)};function ze(e,n,t){var r=en(t);if(r!==t&&n.call(e,r)){var o=T(e);console.warn("Reactive ".concat(o," contains both the raw and reactive ")+"versions of the same object".concat("Map"===o?" as keys":"",", ")+"which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.")}}var He=new WeakMap,Le=new WeakMap,We=new WeakMap,Ke=new WeakMap;function Ye(e){return Xe(e)?e:qe(e,!1,ve,Fe,He)}function Be(e){return qe(e,!0,he,$e,We)}function Ge(e){return qe(e,!0,ye,Ue,Ke)}function qe(e,n,t,r,o){if(!C(e))return"production"!==process.env.NODE_ENV&&console.warn("value cannot be made reactive: ".concat(String(e))),e;if(e.__v_raw&&(!n||!e.__v_isReactive))return e;var i=o.get(e);if(i)return i;var a,c=(a=e).__v_skip||!Object.isExtensible(a)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(T(a));if(0===c)return e;var u=new Proxy(e,2===c?r:t);return o.set(e,u),u}function Je(e){return Xe(e)?Je(e.__v_raw):!(!e||!e.__v_isReactive)}function Xe(e){return!(!e||!e.__v_isReadonly)}function Qe(e){return!(!e||!e.__v_isShallow)}function Ze(e){return Je(e)||Xe(e)}function en(e){var n=e&&e.__v_raw;return n?en(n):e}function nn(e){return function(e,n,t){Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value:t})}(e,"__v_skip",!0),e}var tn=function(e){return C(e)?Ye(e):e},rn=function(e){return C(e)?Be(e):e};function on(e){return!(!e||!0!==e.__v_isRef)}var an,cn={get:function(e,n,t){return on(r=Reflect.get(e,n,t))?r.value:r;var r},set:function(e,n,t,r){var o=e[n];return on(o)&&!on(t)?(o.value=t,!0):Reflect.set(e,n,t,r)}};var un=[];function sn(e){un.push(e)}function ln(){un.pop()}function fn(e){ee();for(var n=un.length?un[un.length-1].component:null,t=n&&n.appContext.config.warnHandler,r=pn(),i=arguments.length,a=new Array(i>1?i-1:0),c=1;c<i;c++)a[c-1]=arguments[c];if(t)yn(t,n,11,[e+a.join(""),n&&n.proxy,r.map((function(e){var t=e.vnode;return"at <".concat(jt(n,t.type),">")})).join("\n"),r]);else{var u,s=["[Vue warn]: ".concat(e)].concat(a);r.length&&s.push.apply(s,["\n"].concat(o(dn(r)))),(u=console).warn.apply(u,o(s))}ne()}function pn(){var e=un[un.length-1];if(!e)return[];for(var n=[];e;){var t=n[0];t&&t.vnode===e?t.recurseCount++:n.push({vnode:e,recurseCount:0});var r=e.component&&e.component.parent;e=r&&r.vnode}return n}function dn(e){var n=[];return e.forEach((function(e,t){var r,i,a,c,u,s,l,f,p,d;n.push.apply(n,o(0===t?[]:["\n"]).concat(o((u=(c=e).vnode,s=c.recurseCount,l=s>0?"... (".concat(s," recursive calls)"):"",f=!!u.component&&null==u.component.parent,p=" at <".concat(jt(u.component,u.type,f)),d=">"+l,u.props?[p].concat(o((r=u.props,i=[],(a=Object.keys(r)).slice(0,3).forEach((function(e){i.push.apply(i,o(vn(e,r[e])))})),a.length>3&&i.push(" ..."),i)),[d]):[p+d]))))})),n}function vn(e,n,t){return R(n)?(n=JSON.stringify(n),t?n:["".concat(e,"=").concat(n)]):"number"==typeof n||"boolean"==typeof n||null==n?t?n:["".concat(e,"=").concat(n)]:on(n)?(n=vn(e,en(n.value),!0),t?n:["".concat(e,"=Ref<"),n,">"]):x(n)?["".concat(e,"=fn").concat(n.name?"<".concat(n.name,">"):"")]:(n=en(n),t?n:["".concat(e,"="),n])}var hn=(r(an={},"sp","serverPrefetch hook"),r(an,"bc","beforeCreate hook"),r(an,"c","created hook"),r(an,"bm","beforeMount hook"),r(an,"m","mounted hook"),r(an,"bu","beforeUpdate hook"),r(an,"u","updated"),r(an,"bum","beforeUnmount hook"),r(an,"um","unmounted hook"),r(an,"a","activated hook"),r(an,"da","deactivated hook"),r(an,"ec","errorCaptured hook"),r(an,"rtc","renderTracked hook"),r(an,"rtg","renderTriggered hook"),r(an,0,"setup function"),r(an,1,"render function"),r(an,2,"watcher getter"),r(an,3,"watcher callback"),r(an,4,"watcher cleanup function"),r(an,5,"native event handler"),r(an,6,"component event handler"),r(an,7,"vnode hook"),r(an,8,"directive hook"),r(an,9,"transition hook"),r(an,10,"app errorHandler"),r(an,11,"app warnHandler"),r(an,12,"ref function"),r(an,13,"async component loader"),r(an,14,"scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"),an);function yn(e,n,t,r){var i;try{i=r?e.apply(void 0,o(r)):e()}catch(e){_n(e,n,t)}return i}function gn(e,n,t,r){if(x(e)){var o=yn(e,n,t,r);return o&&(C(i=o)&&x(i.then)&&x(i.catch))&&o.catch((function(e){_n(e,n,t)})),o}for(var i,a=[],c=0;c<e.length;c++)a.push(gn(e[c],n,t,r));return a}function _n(e,n,t){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=n?n.vnode:null;if(n){for(var i=n.parent,a=n.proxy,c="production"!==process.env.NODE_ENV?hn[t]:t;i;){var u=i.ec;if(u)for(var s=0;s<u.length;s++)if(!1===u[s](e,a,c))return;i=i.parent}var l=n.appContext.config.errorHandler;if(l)return void yn(l,null,10,[e,a,c])}mn(e,t,o,r)}function mn(e,n,t){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];if("production"!==process.env.NODE_ENV){var o=hn[n];if(t&&sn(t),fn("Unhandled error".concat(o?" during execution of ".concat(o):"")),t&&ln(),r)throw e;console.error(e)}else console.error(e)}var bn=!1,En=!1,wn=[],Nn=0,On=[],Sn=null,Vn=0,kn=[],Dn=null,xn=0,Rn=Promise.resolve(),jn=null,Cn=null;function An(e){var n=jn||Rn;return e?n.then(this?e.bind(this):e):n}function Pn(e){wn.length&&wn.includes(e,bn&&e.allowRecurse?Nn+1:Nn)||e===Cn||(null==e.id?wn.push(e):wn.splice(function(e){for(var n=Nn+1,t=wn.length;n<t;){var r=n+t>>>1;Un(wn[r])<e?n=r+1:t=r}return n}(e.id),0,e),Tn())}function Tn(){bn||En||(En=!0,jn=Rn.then(zn))}function Mn(e,n,t,r){k(e)?t.push.apply(t,o(e)):n&&n.includes(e,e.allowRecurse?r+1:r)||t.push(e),Tn()}function In(e){Mn(e,Sn,On,Vn)}function Fn(e){Mn(e,Dn,kn,xn)}function $n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(On.length){for(Cn=n,Sn=o(new Set(On)),On.length=0,"production"!==process.env.NODE_ENV&&(e=e||new Map),Vn=0;Vn<Sn.length;Vn++)"production"!==process.env.NODE_ENV&&Hn(e,Sn[Vn])||Sn[Vn]();Sn=null,Vn=0,Cn=null,$n(e,n)}}var Un=function(e){return null==e.id?1/0:e.id};function zn(e){En=!1,bn=!0,"production"!==process.env.NODE_ENV&&(e=e||new Map),$n(e),wn.sort((function(e,n){return Un(e)-Un(n)}));var n="production"!==process.env.NODE_ENV?function(n){return Hn(e,n)}:b;try{for(Nn=0;Nn<wn.length;Nn++){var t=wn[Nn];if(t&&!1!==t.active){if("production"!==process.env.NODE_ENV&&n(t))continue;yn(t,null,14)}}}finally{Nn=0,wn.length=0,function(e){if(kn.length){var n,t=o(new Set(kn));if(kn.length=0,Dn)return void(n=Dn).push.apply(n,o(t));for(Dn=t,"production"!==process.env.NODE_ENV&&(e=e||new Map),Dn.sort((function(e,n){return Un(e)-Un(n)})),xn=0;xn<Dn.length;xn++)"production"!==process.env.NODE_ENV&&Hn(e,Dn[xn])||Dn[xn]();Dn=null,xn=0}}(e),bn=!1,jn=null,(wn.length||On.length||kn.length)&&zn(e)}}function Hn(e,n){if(e.has(n)){var t=e.get(n);if(t>100){var r=n.ownerInstance,o=r&&Rt(r.type);return fn("Maximum recursive updates exceeded".concat(o?" in component <".concat(o,">"):"",". ")+"This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function."),!0}e.set(n,t+1)}else e.set(n,1)}var Ln=new Set;"production"!==process.env.NODE_ENV&&((m||(m="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})).__VUE_HMR_RUNTIME__={createRecord:Bn((function(e,n){if(Wn.has(e))return!1;return Wn.set(e,{initialDef:Kn(n),instances:new Set}),!0})),rerender:Bn((function(e,n){var t=Wn.get(e);if(!t)return;t.initialDef.render=n,o(t.instances).forEach((function(e){n&&(e.render=n,Kn(e.type).render=n),e.renderCache=[],e.update()}))})),reload:Bn((function(e,n){var t=Wn.get(e);if(!t)return;n=Kn(n),Yn(t.initialDef,n);var r,i=o(t.instances),a=c(i);try{for(a.s();!(r=a.n()).done;){var u=r.value,s=Kn(u.type);Ln.has(s)||(s!==t.initialDef&&Yn(s,n),Ln.add(s)),u.appContext.optionsCache.delete(u.type),u.ceReload?(Ln.add(s),u.ceReload(n.styles),Ln.delete(s)):u.parent?(Pn(u.parent.update),u.parent.type.__asyncLoader&&u.parent.ceReload&&u.parent.ceReload(n.styles)):u.appContext.reload?u.appContext.reload():"undefined"!=typeof window?window.location.reload():console.warn("[HMR] Root or manually mounted instance modified. Full reload required.")}}catch(e){a.e(e)}finally{a.f()}Fn((function(){var e,n=c(i);try{for(n.s();!(e=n.n()).done;){var t=e.value;Ln.delete(Kn(t.type))}}catch(e){n.e(e)}finally{n.f()}}))}))});var Wn=new Map;function Kn(e){return Ct(e)?e.__vccOpts:e}function Yn(e,n){for(var t in N(e,n),e)"__file"===t||t in n||delete e[t]}function Bn(e){return function(n,t){try{return e(n,t)}catch(e){console.error(e),console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.")}}}var Gn=function(e){return e.__isSuspense};var qn={};function Jn(e,n,t){var r,o,i,a=this.proxy,c=R(e)?e.includes(".")?(r=a,o=e.split("."),function(){for(var e=r,n=0;n<o.length&&e;n++)e=e[o[n]];return e}):function(){return a[e]}:e.bind(a,a);x(n)?i=n:(i=n.handler,t=n);var u=St;Vt(this);var s=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:y,r=t.immediate,o=t.deep,i=t.flush,a=t.onTrack,c=t.onTrigger;"production"===process.env.NODE_ENV||n||(void 0!==r&&fn('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'),void 0!==o&&fn('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));var u,s,l=function(e){fn("Invalid watch source: ",e,"A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")},f=St,p=!1,d=!1;if(on(e)?(u=function(){return e.value},p=Qe(e)):Je(e)?(u=function(){return e},o=!0):k(e)?(d=!0,p=e.some(Je),u=function(){return e.map((function(e){return on(e)?e.value:Je(e)?Xn(e):x(e)?yn(e,f,2):void("production"!==process.env.NODE_ENV&&l(e))}))}):x(e)?u=n?function(){return yn(e,f,2)}:function(){if(!f||!f.isUnmounted)return s&&s(),gn(e,f,3,[h])}:(u=b,"production"!==process.env.NODE_ENV&&l(e)),n&&o){var v=u;u=function(){return Xn(v())}}var h=function(e){s=m.onStop=function(){yn(e,f,4)}},g=d?[]:qn,_=function(){if(m.active)if(n){var e=m.run();(o||p||(d?e.some((function(e,n){return F(e,g[n])})):F(e,g)))&&(s&&s(),gn(n,f,3,[e,g===qn?void 0:g,h]),g=e)}else m.run()};_.allowRecurse=!!n;var m=new J(u,"sync"===i?_:"post"===i?function(){return ot(_,f&&f.suspense)}:function(){!f||f.isMounted?In(_):_()});return"production"!==process.env.NODE_ENV&&(m.onTrack=a,m.onTrigger=c),n?r?_():g=m.run():"post"===i?ot(m.run.bind(m),f&&f.suspense):m.run(),function(){m.stop(),f&&f.scope&&O(f.scope.effects,m)}}(c,i.bind(a),t);return u?Vt(u):kt(),s}function Xn(e,n){if(!C(e)||e.__v_skip)return e;if((n=n||new Set).has(e))return e;if(n.add(e),on(e))Xn(e.value,n);else if(k(e))for(var t=0;t<e.length;t++)Xn(e[t],n);else if("[object Set]"===P(e)||D(e))e.forEach((function(e){Xn(e,n)}));else if(function(e){return"[object Object]"===P(e)}(e))for(var r in e)Xn(e[r],n);return e}function Qn(e,n,t){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=n.mixins,i=n.extends;for(var a in i&&Qn(e,i,t,!0),o&&o.forEach((function(n){return Qn(e,n,t,!0)})),n)if(r&&"expose"===a)"production"!==process.env.NODE_ENV&&fn('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');else{var c=Zn[a]||t&&t[a];e[a]=c?c(e[a],n[a]):n[a]}return e}var Zn={data:et,props:rt,emits:rt,methods:rt,computed:rt,beforeCreate:tt,created:tt,beforeMount:tt,mounted:tt,beforeUpdate:tt,updated:tt,beforeDestroy:tt,beforeUnmount:tt,destroyed:tt,unmounted:tt,activated:tt,deactivated:tt,errorCaptured:tt,serverPrefetch:tt,components:rt,directives:rt,watch:function(e,n){if(!e)return n;if(!n)return e;var t=N(Object.create(null),e);for(var r in n)t[r]=tt(e[r],n[r]);return t},provide:et,inject:function(e,n){return rt(nt(e),nt(n))}};function et(e,n){return n?e?function(){return N(x(e)?e.call(this,this):e,x(n)?n.call(this,this):n)}:n:e}function nt(e){if(k(e)){for(var n={},t=0;t<e.length;t++)n[e[t]]=e[t];return n}return e}function tt(e,n){return e?o(new Set([].concat(e,n))):n}function rt(e,n){return e?N(N(Object.create(null),e),n):n}var ot=function(e,n){var t;n&&n.pendingBranch?k(e)?(t=n.effects).push.apply(t,o(e)):n.effects.push(e):Fn(e)},it=function(e){return e.__isTeleport},at=Symbol(),ct=Symbol("production"!==process.env.NODE_ENV?"Fragment":void 0),ut=Symbol("production"!==process.env.NODE_ENV?"Text":void 0),st=Symbol("production"!==process.env.NODE_ENV?"Comment":void 0);Symbol("production"!==process.env.NODE_ENV?"Static":void 0);function lt(e){return!!e&&!0===e.__v_isVNode}var ft=function(e){var n=e.key;return null!=n?n:null},pt=function(e){var n=e.ref,t=e.ref_key,r=e.ref_for;return null!=n?R(n)||on(n)||x(n)?{i:null,r:n,k:t,f:!!r}:n:null};function dt(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:e===ct?0:1,a=arguments.length>7&&void 0!==arguments[7]&&arguments[7],c={__v_isVNode:!0,__v_skip:!0,type:e,props:n,key:n&&ft(n),ref:n&&pt(n),scopeId:null,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:o,dynamicChildren:null,appContext:null};return a?(bt(c,t),128&i&&e.normalize(c)):t&&(c.shapeFlag|=R(t)?8:16),"production"!==process.env.NODE_ENV&&c.key!=c.key&&fn("VNode created with invalid key (NaN). VNode type:",c.type),c}var vt="production"!==process.env.NODE_ENV?function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return ht.apply(void 0,o(n))}:ht;function ht(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,i=arguments.length>5&&void 0!==arguments[5]&&arguments[5];if(e&&e!==at||("production"===process.env.NODE_ENV||e||fn("Invalid vnode type when creating vnode: ".concat(e,".")),e=st),lt(e)){var a=gt(e,n,!0);return t&&bt(a,t),a}if(Ct(e)&&(e=e.__vccOpts),n){var c=n=yt(n),u=c.class,s=c.style;u&&!R(u)&&(n.class=h(u)),C(s)&&(Ze(s)&&!k(s)&&(s=N({},s)),n.style=f(s))}var l=R(e)?1:Gn(e)?128:it(e)?64:C(e)?4:x(e)?2:0;return"production"!==process.env.NODE_ENV&&4&l&&Ze(e)&&fn("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.","\nComponent that was made reactive: ",e=en(e)),dt(e,n,t,r,o,l,i,!0)}function yt(e){return e?Ze(e)||"__vInternal"in e?N({},e):e:null}function gt(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=e.props,o=e.ref,i=e.patchFlag,a=e.children,c=n?Et(r||{},n):r,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&ft(c),ref:n&&n.ref?t&&o?k(o)?o.concat(pt(n)):[o,pt(n)]:pt(n):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:"production"!==process.env.NODE_ENV&&-1===i&&k(a)?a.map(_t):a,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:n&&e.type!==ct?-1===i?16:16|i:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&gt(e.ssContent),ssFallback:e.ssFallback&&gt(e.ssFallback),el:e.el,anchor:e.anchor};return u}function _t(e){var n=gt(e);return k(e.children)&&(n.children=e.children.map(_t)),n}function mt(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:" ",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return vt(ut,null,e,n)}function bt(n,t){var r=0,o=n.shapeFlag;if(null==t)t=null;else if(k(t))r=16;else if("object"===e(t)){if(65&o){var i=t.default;return void(i&&(i._c&&(i._d=!1),bt(n,i()),i._c&&(i._d=!0)))}r=32;var a=t._;a||"__vInternal"in t||(t._ctx=null)}else x(t)?(t={default:t,_ctx:null},r=32):(t=String(t),64&o?(r=16,t=[mt(t)]):r=8);n.children=t,n.shapeFlag|=r}function Et(){for(var e={},n=0;n<arguments.length;n++){var t=n<0||arguments.length<=n?void 0:arguments[n];for(var r in t)if("class"===r)e.class!==t.class&&(e.class=h([e.class,t.class]));else if("style"===r)e.style=f([e.style,t.style]);else if(w(r)){var o=e[r],i=t[r];!i||o===i||k(o)&&o.includes(i)||(e[r]=o?[].concat(o,i):i)}else""!==r&&(e[r]=t[r])}return e}var wt=function e(n){return n?4&n.vnode.shapeFlag?function(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Je(n=nn(e.exposed))?n:new Proxy(n,cn),{get:function(n,t){return t in n?n[t]:t in Nt?Nt[t](e):void 0}}));var n}(n)||n.proxy:e(n.parent):null},Nt=N(Object.create(null),{$:function(e){return e},$el:function(e){return e.vnode.el},$data:function(e){return e.data},$props:function(e){return"production"!==process.env.NODE_ENV?Ge(e.props):e.props},$attrs:function(e){return"production"!==process.env.NODE_ENV?Ge(e.attrs):e.attrs},$slots:function(e){return"production"!==process.env.NODE_ENV?Ge(e.slots):e.slots},$refs:function(e){return"production"!==process.env.NODE_ENV?Ge(e.refs):e.refs},$parent:function(e){return wt(e.parent)},$root:function(e){return wt(e.root)},$emit:function(e){return e.emit},$options:function(e){return __VUE_OPTIONS_API__?function(e){var n,t=e.type,r=t.mixins,o=t.extends,i=e.appContext,a=i.mixins,c=i.optionsCache,u=i.config.optionMergeStrategies,s=c.get(t);return s?n=s:a.length||r||o?(n={},a.length&&a.forEach((function(e){return Qn(n,e,u,!0)})),Qn(n,t,u)):n=t,c.set(t,n),n}(e):e.type},$forceUpdate:function(e){return function(){return Pn(e.update)}},$nextTick:function(e){return An.bind(e.proxy)},$watch:function(e){return __VUE_OPTIONS_API__?Jn.bind(e):b}}),Ot={get:function(e,n){var t,r=e._,o=r.ctx,i=r.setupState,a=r.data,c=r.props,u=r.accessCache,s=r.type,l=r.appContext;if("production"!==process.env.NODE_ENV&&"__isVue"===n)return!0;if("production"!==process.env.NODE_ENV&&i!==y&&i.__isScriptSetup&&V(i,n))return i[n];if("$"!==n[0]){var f=u[n];if(void 0!==f)switch(f){case 1:return i[n];case 2:return a[n];case 4:return o[n];case 3:return c[n]}else{if(i!==y&&V(i,n))return u[n]=1,i[n];if(a!==y&&V(a,n))return u[n]=2,a[n];if((t=r.propsOptions[0])&&V(t,n))return u[n]=3,c[n];if(o!==y&&V(o,n))return u[n]=4,o[n];__VUE_OPTIONS_API__,u[n]=0}}var p,d,v=Nt[n];return v?("$attrs"===n&&(te(r,"get",n),process.env.NODE_ENV),v(r)):(p=s.__cssModules)&&(p=p[n])?p:o!==y&&V(o,n)?(u[n]=4,o[n]):(d=l.config.globalProperties,V(d,n)?d[n]:void process.env.NODE_ENV)},set:function(e,n,t){var r=e._,o=r.data,i=r.setupState,a=r.ctx;return i!==y&&V(i,n)?(i[n]=t,!0):o!==y&&V(o,n)?(o[n]=t,!0):V(r.props,n)?("production"!==process.env.NODE_ENV&&fn('Attempting to mutate prop "'.concat(n,'". Props are readonly.'),r),!1):"$"===n[0]&&n.slice(1)in r?("production"!==process.env.NODE_ENV&&fn('Attempting to mutate public property "'.concat(n,'". ')+"Properties starting with $ are reserved and readonly.",r),!1):("production"!==process.env.NODE_ENV&&n in r.appContext.config.globalProperties?Object.defineProperty(a,n,{enumerable:!0,configurable:!0,value:t}):a[n]=t,!0)},has:function(e,n){var t,r=e._,o=r.data,i=r.setupState,a=r.accessCache,c=r.ctx,u=r.appContext,s=r.propsOptions;return!!a[n]||o!==y&&V(o,n)||i!==y&&V(i,n)||(t=s[0])&&V(t,n)||V(c,n)||V(Nt,n)||V(u.config.globalProperties,n)},defineProperty:function(e,n,t){return null!=t.get?e._.accessCache[n]=0:V(t,"value")&&this.set(e,n,t.value,null),Reflect.defineProperty(e,n,t)}};"production"!==process.env.NODE_ENV&&(Ot.ownKeys=function(e){return fn("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."),Reflect.ownKeys(e)});var St=null,Vt=function(e){St=e,e.scope.on()},kt=function(){St&&St.scope.off(),St=null};var Dt=/(?:^|[-_])(\w)/g,xt=function(e){return e.replace(Dt,(function(e){return e.toUpperCase()})).replace(/[-_]/g,"")};function Rt(e){return x(e)&&e.displayName||e.name}function jt(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=Rt(n);if(!r&&n.__file){var o=n.__file.match(/([^/\\]+)\.\w+$/);o&&(r=o[1])}if(!r&&e&&e.parent){var i=function(e){for(var t in e)if(e[t]===n)return t};r=i(e.components||e.parent.type.components)||i(e.appContext.components)}return r?xt(r):t?"App":"Anonymous"}function Ct(e){return x(e)&&"__vccOpts"in e}function At(e){return!(!e||!e.__v_isShallow)}function Pt(){if("production"!==process.env.NODE_ENV&&"undefined"!=typeof window){var e={style:"color:#3ba776"},n={style:"color:#0b1bc9"},t={style:"color:#b62e24"},r={style:"color:#9d288c"},i={header:function(n){return C(n)?n.__isVue?["div",e,"VueInstance"]:on(n)?["div",{},["span",e,l(n)],"<",c(n.value),">"]:Je(n)?["div",{},["span",e,At(n)?"ShallowReactive":"Reactive"],"<",c(n),">".concat(Xe(n)?" (readonly)":"")]:Xe(n)?["div",{},["span",e,At(n)?"ShallowReadonly":"Readonly"],"<",c(n),">"]:null:null},hasBody:function(e){return e&&e.__isVue},body:function(e){if(e&&e.__isVue)return["div",{}].concat(o(function(e){var n=[];e.type.props&&e.props&&n.push(a("props",en(e.props)));e.setupState!==y&&n.push(a("setup",e.setupState));e.data!==y&&n.push(a("data",en(e.data)));var t=u(e,"computed");t&&n.push(a("computed",t));var o=u(e,"inject");o&&n.push(a("injected",o));return n.push(["div",{},["span",{style:r.style+";opacity:0.66"},"$ (internal): "],["object",{object:e}]]),n}(e.$)))}};window.devtoolsFormatters?window.devtoolsFormatters.push(i):window.devtoolsFormatters=[i]}function a(e,n){return n=N({},n),Object.keys(n).length?["div",{style:"line-height:1.25em;margin-bottom:0.6em"},["div",{style:"color:#476582"},e],["div",{style:"padding-left:1.25em"}].concat(o(Object.keys(n).map((function(e){return["div",{},["span",r,e+": "],c(n[e],!1)]}))))]:["span",{}]}function c(e){var o=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return"number"==typeof e?["span",n,e]:"string"==typeof e?["span",t,JSON.stringify(e)]:"boolean"==typeof e?["span",r,e]:C(e)?["object",{object:o?en(e):e}]:["span",t,String(e)]}function u(e,n){var t=e.type;if(!x(t)){var r={};for(var o in e.ctx)s(t,o,n)&&(r[o]=e.ctx[o]);return r}}function s(e,n,t){var r=e[t];return!!(k(r)&&r.includes(n)||C(r)&&n in r)||(!(!e.extends||!s(e.extends,n,t))||(!(!e.mixins||!e.mixins.some((function(e){return s(e,n,t)})))||void 0))}function l(e){return At(e)?"ShallowRef":e.effect?"ComputedRef":"Ref"}}Symbol("production"!==process.env.NODE_ENV?"ssrContext":""),"production"!==process.env.NODE_ENV&&Pt();const Tt=Symbol("$store");exports.default=class{factory(e,n){e.cache.data=Ye({data:e.cache.data}).data,n.provide(Tt,e),n.config.globalProperties.$store=e}},exports.storeSymbol=Tt;
