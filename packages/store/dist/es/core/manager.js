import set from 'set-value';
import { isVue2, isVue3 } from 'vue-demi';
import { klona } from 'klona';
import { StoreModule } from './module';
import { getFirstPropKey, requiredFunctionDefined } from '../utils';
import Vue2Adapter from '../adapter/vue2';
import Vue3Adapter from '../adapter/vue3';
/** StoreManager */
export class StoreManager {
    /** store options */
    options;
    /** store plugins */
    plugins = [];
    /** 是否初始化完成 */
    ready;
    /** 缓存/数据源 */
    cache = { keys: {}, data: {} };
    /** get all module name */
    get modules() {
        return Object.keys(this).filter((key) => {
            return this[key] instanceof StoreModule;
        });
    }
    constructor(options) {
        let adapter;
        if (isVue2) {
            adapter = Vue2Adapter;
        }
        else if (isVue3) {
            adapter = Vue3Adapter;
        }
        this.options = {
            // default
            version: '1.0.0',
            adapter,
            // custom
            ...options
        };
    }
    /** 安装
     *
     * @description 允许脱离 vue 单独使用, 但脱离 vue 使用时, 需要先执行 store.install() 操作.
     * @support 支持 vue2.x, vue3.x, 及独立使用.
     */
    install(app, ..._options) {
        this.init();
        // ? 支持抛开vue使用
        if (!app)
            return this;
        // register to target use adapter. basic: vue2, vue3
        if (this.options.adapter)
            this.options.adapter.register(this, app);
        // > emit plugin binded to vue event
        this.emit((plugin, _latest, _origin) => {
            plugin.onBindedToVue?.(this, app);
        });
        return this;
    }
    /** 清除模块数据并重新初始化
     *
     * @param {Array<string>} specifyModules 可选, 不填则清除所有数据
     */
    $clear(specifyModules) {
        specifyModules = specifyModules ?? this.modules;
        if (!(specifyModules instanceof Array)) {
            throw new Error('$store.clear() params type need to Arrray<string>.');
        }
        let model;
        // # 逐个清理, 还原数据
        for (const moduleName of specifyModules) {
            model = this[moduleName];
            // init origin data.
            this.cache.data[moduleName] = model['initData']();
            // 持久化
            this.persistence(moduleName, model);
        }
    }
    /** 初始化 */
    init() {
        if (this.ready)
            return;
        // > emit plugin binded to vue event
        this.emit((plugin, latest, origin) => {
            plugin.onBeforeInit?.(this);
            return latest;
        });
        let model;
        // # module init
        for (const moduleName of this.modules) {
            model = this[moduleName];
            // ? check initData is defined
            requiredFunctionDefined(`$store.${moduleName}`, model, ['initData']);
            // > inject
            this.injectFactory(moduleName, model);
            // init module data
            this.prepare(moduleName, model);
        }
        this.ready = true;
        // emit store ready event.
        this.emit((plugin, latest, origin) => {
            plugin.onReady?.(this);
            return latest;
        });
    }
    /** generateModuleHash
     *
     * @description transform origin module name to `module hsah`, and be used for data storage.
     */
    generateModuleHash(moduleName) {
        // > transform module hash by plugin
        const moduleHash = this.emit((plugin, latest, origin) => {
            if (plugin.transformModuleHash)
                return plugin.transformModuleHash(latest, origin);
            else
                return latest;
        }, moduleName);
        return moduleHash;
    }
    /** injectFactory
     *
     * @description use function mapping realization StoreModule abstract function.
     */
    injectFactory(moduleName, model) {
        const ERROR_PREFIX = `$store.${moduleName} `;
        model['__parent__'] = this;
        // # inject Function 'getData'
        model['getData'] = () => {
            return this.cache.data[moduleName] ?? {};
        };
        // # inject Function 'commit'
        model['$commit'] = (key, value, options) => {
            const firstObjectPath = getFirstPropKey(key);
            // ? 校验commit key第一位是否是预定义字段
            if (!this.cache.keys[moduleName].includes(firstObjectPath)) {
                throw new Error(ERROR_PREFIX + `'${firstObjectPath}' is not defined.`);
            }
            // > update value
            set(this.cache.data[moduleName], key, value, options);
            // # 指定数据持久化
            this.persistence(moduleName, model);
        };
        // # inject Function '$patch'
        model['$patch'] = (data, options) => {
            if (!data) {
                throw new Error(ERROR_PREFIX + `$patch must has 'data'.`);
            }
            if (typeof data !== 'object' || data instanceof Array) {
                throw new Error(ERROR_PREFIX + `$patch's data should is IData.`);
            }
            // diff not defined prop
            const notDefindProp = Object.keys(data)
                .map((key) => getFirstPropKey(key))
                .filter((key) => !this.cache.keys[moduleName].includes(key));
            // ? check prop is defined.
            if (notDefindProp.length > 0) {
                throw new Error(ERROR_PREFIX + `${JSON.stringify(notDefindProp)} is not defined.`);
            }
            // execute change
            for (const key in data) {
                set(this.cache.data[moduleName], key, data[key], options);
            }
            // # 指定数据持久化
            this.persistence(moduleName, model);
        };
        // # inject Function 'clear'
        model['$clear'] = () => this.$clear([moduleName]);
    }
    /** data prepare */
    prepare(moduleName, model) {
        const NAME_HASH = this.generateModuleHash(moduleName);
        // hacker: use ['key'] skip ts check.
        const dataStr = model['storage']?.getItem(NAME_HASH) ?? null;
        const origin = model['initData']();
        let persistenceData = {};
        if (dataStr) {
            const body = JSON.parse(dataStr);
            if (body?.version === this.options.version) {
                // on prepare, transform persistenced data by plugin
                persistenceData = this.emit((plugin, latest, origin) => {
                    if (plugin.transformPrepare)
                        return plugin.transformPrepare(latest, origin);
                    else
                        return latest;
                }, body.data);
            }
        }
        // cache keys
        this.cache.keys[moduleName] = Object.keys(origin);
        // cache data: merge initData() result and persitenced data.
        this.cache.data[moduleName] = { ...origin, ...persistenceData };
        // # re persistence
        this.persistence(moduleName, model);
    }
    /** data persistence */
    persistence(moduleName, model) {
        const NAME_HASH = this.generateModuleHash(moduleName);
        const origin = this.cache.data[moduleName];
        const storage = model['storage'];
        const PERSISTENCE_KEYS = model['PERSISTENCE_KEYS'];
        let data = {};
        // ? check need to skip
        if (!storage || !PERSISTENCE_KEYS)
            return;
        let isPersistenced;
        // normalize peristence data
        for (const key in origin) {
            isPersistenced = PERSISTENCE_KEYS.includes(key) && origin[key] !== undefined;
            // ? check is persistence prop, then set to cache data.
            // ! notes: undefined not write
            if (isPersistenced && origin[key] !== undefined)
                data[key] = origin[key];
        }
        // > on persistence, transform origin data by plugin
        data = this.emit((plugin, latest, origin) => {
            if (plugin.transformPersistence)
                return plugin.transformPersistence(latest, origin);
            else
                return latest;
        }, data);
        // generate body and set version.
        const body = { data, version: this.options.version };
        // ? 对应缺少待存储数据时, 清理 storage
        if (data === undefined || data === null || (typeof data === 'object' && Object.keys(data).length === 0)) {
            // > clear cache data
            storage.removeItem(NAME_HASH);
        }
        else {
            // > set to storage
            storage.setItem(NAME_HASH, JSON.stringify(body));
        }
    }
    /** 向插件推送生命周期变化 */
    emit(handle, origin = undefined) {
        if (!this.plugins || !(this.plugins instanceof Array))
            return;
        // # copy origin data
        let latest = klona(origin);
        // > loop recursion
        for (const plugin of this.plugins)
            latest = handle(plugin, latest, origin);
        return latest;
    }
}
