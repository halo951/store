import type { IStorePlugin } from '@cp0/store/src/index'
/** plugin options */
export interface IStoreModuleHashOptions {
    /** store module 数据持久化前缀 */
    prefix?: string
    /** store module 数据持久化后缀 */
    suffix?: string
    /** 对 持久化存储的 module key, 进行 */
    hash?: boolean | 'simple' | 'lang'
}
/** 自定义模块签名插件 */
export declare class StoreModuleHashPlugin implements IStorePlugin {
    options: IStoreModuleHashOptions
    constructor(options: IStoreModuleHashOptions)
    /** 自定义模块签名
     *
     * @description 用于自定义持久化模块签名
     * @returns {string} 转换过的签名
     */
    transformModuleHash(moduleName: string, originName?: string): string
}
