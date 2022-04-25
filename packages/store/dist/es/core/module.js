/** StoreModule */
export class StoreModule {
    /* options */
    __parent__;
    // @ts-ignore
    storage;
    /** 持久化数据 key 集合 */
    PERSISTENCE_KEYS;
    /** 获取数据集 */
    getData;
    /* getter/setter */
    get parent() {
        return this.__parent__;
    }
    get state() {
        return this.getData?.();
    }
    /** 构造方法 */
    constructor(storage) {
        if (storage)
            this.storage = storage;
    }
    /** 提交数据
     * @using this.$commit(key, value)
     *
     * @description -
     *  ☆ 支持通过 object-path 方式提交值变更.
     *      origin: $commit('key', target) | [key]: origin -> [key]: target
     *      object: $commit('a.b.c', 1) | a: { b: c:0 }  -> a: { b: c:1 }
     *      array: $commit('a.1', 2) | a: [0, 0, 0] -> a: [0, 2, 0]
     *
     * @note 注意: 当使用 object-path 方式, 赋值时, **`默认只检查首个path是否定义`**, 如需额外检查, 建议通过 setter 实现.
     *
     * @param {string | Array<string | number>} key
     * @param {any} value
     * @param {Options} options? 可选, 参考: set-value options属性.
     */
    $commit(key, value, options) {
        // intf - 接口, 实现方法由 StoreManager 注入.
    }
    /** 模仿 finia $patch() / 小程序的 setData()
     * @using this.$commit(IData, value)
     *
     * @description
     *  - 具备原子性(Atomicity) 特点, 操作要么全部执行, 要么完全不执行。
     *
     * @note 持久化是在set-value 完成后执行
     *
     * @param {IData} data
     * @param {any} value
     */
    $patch(data, options) {
        // intf - 接口, 实现方法由 StoreManager 注入.
    }
    /** 清除状态数据 */
    $clear() {
        // intf - 接口, 依赖 StoreInject 实现
    }
}
