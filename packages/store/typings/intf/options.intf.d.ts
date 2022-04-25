import { IStoreAdapter } from './adapter.intf'
/** store 构造参数定义 */
export interface IStoreOptions {
    /** 数据版本号, 如果碰到新旧数据冲突(持久化数据)的场景, 可通过修改版本号使旧数据失效.
     * 版本号可通过: process.env.VUE_APP_VERSION 设置
     */
    version?: string
    /** 适配器, 当默认的 vue2-adapter / vue3-adapter 不适用时, 可自行实现适配器选项. */
    adapter?: IStoreAdapter
}
