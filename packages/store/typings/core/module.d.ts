import type { IData } from '../intf/data.intf'
import type { Options } from 'set-value'
/** StoreModule */
export declare abstract class StoreModule<Data extends IData = IData, Parent = unknown> {
    private __parent__
    private storage
    /** 持久化数据 key 集合 */
    protected PERSISTENCE_KEYS: Array<string>
    /** 获取数据集 */
    private getData
    protected get parent(): Parent
    protected get state(): Data
    /** 构造方法 */
    constructor(storage?: Storage)
    /** 设定模块初始化数据 */
    protected abstract initData(): Data
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
    protected $commit(key: string | Array<string | number>, value: any, options?: Options): void
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
    protected $patch(data: IData, options?: Options): void
    /** 清除状态数据 */
    protected $clear(): void
}
