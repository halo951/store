import type { IStorePlugin, IData } from '@fdu/store'
/** plugin options */
export interface IStoreEncryptOptions {
    /** AES 对称加密 key 参数 */
    key: string
}
/** @fdu/store 持久化数据加密插件
 *
 * @description 基于 CryptoJs.AES 进行对称加密
 */
export declare class StoreEncryptPlugin implements IStorePlugin {
    options: IStoreEncryptOptions
    constructor(options: IStoreEncryptOptions)
    /** 读取持久化数据处理
     *
     * @description 在准备数据阶段, 对读取到的持久化数据进行还原操作
     * @returns {any} 已还原的数据
     */
    transformPrepare?(data: any, origin?: any): any
    /** 持久化数据处理, 需要搭配`transformPrepare` 使用
     *
     * @description 用于对持久化数据进行加密/脱敏等操作
     * @returns {any} 转换过的持久化数据
     */
    transformPersistence?(data: IData | string, origin?: any): any
}
