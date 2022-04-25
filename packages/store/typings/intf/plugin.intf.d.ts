import type { App as VueApp, Vue2 } from 'vue-demi'
import type { StoreManager } from '../index'
/** store 插件 接口定义
 *
 * @description 可根据如下接口顺序, 来初步了解事件触发顺序, 详细了解请运行代码查看
 */
export interface IStorePlugin {
    /** 初始化(前置)事件, 首次触发 store.install() 时触发. */
    onBeforeInit?(store: StoreManager): void
    /** 初始化完成事件 */
    onReady?(store: StoreManager): void
    /** store 被绑定到vue对象时触发
     *
     * @description
     *
     * @param {StorageManager} store
     * @param {*} app in Vue2, app is Vue. in Vue3 app is createApp() result.
     */
    onBindedToVue?(store: StoreManager, app: typeof Vue2 | VueApp): void
    /** 自定义模块签名
     *
     * @description 用于自定义持久化模块签名
     *
     * @param {string} moduleName 模块名
     * @param {string} originName 原始模块名
     *
     * @returns {string} 转换过的签名
     */
    transformModuleHash?(moduleName: string, originName?: string): string
    /** 读取持久化数据处理
     *
     * @description 在准备数据阶段, 对读取到的持久化数据进行还原操作
     *
     * @param {any} data 当前待处理数据
     * @param {any} origin 原始数据
     *
     * @returns {any} 已还原的数据
     */
    transformPrepare?(data: any, origin?: any): any
    /** 持久化数据处理, 需要搭配`transformPrepare` 使用
     *
     * @description 用于对持久化数据进行加密/脱敏等操作
     *
     * @param {any} data 当前待处理数据
     * @param {any} origin 原始数据
     *
     * @returns {any} 转换过的持久化数据
     */
    transformPersistence?(data: any, origin?: any): any
}
