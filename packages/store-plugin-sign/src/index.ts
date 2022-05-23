import type { IStorePlugin } from '@fdu/store'

import { MD5 } from 'crypto-js'

/** plugin options */
export interface IStoreNamespaceOption {
    /** 命名空间前缀 */
    prefix?: string
    /** store module 数据持久化后缀 */
    suffix?: string
    /** 对 持久化存储的 module key, 进行 */
    hash?: boolean | 'simple' | 'lang'
}

export interface IStoreNamespaceFactoryOption {
    /** 自定义签名工厂方法
     *
     * @description 当使用factory
     */
    factory?: (moduleName: string, originName?: string) => string
}

/** store 命名空间插件
 *
 * @description 提供 Store 命名空间能力, 解决持久化字段冲突问题
 */
export class StoreNamespacePlugin implements IStorePlugin {
    options!: IStoreNamespaceOption | IStoreNamespaceFactoryOption

    constructor(options: IStoreNamespaceOption | IStoreNamespaceFactoryOption) {
        this.options = options
    }

    /** 处理模块签名
     *
     * @description 用于自定义持久化模块签名
     * @returns {string} 转换过的签名
     */
    transformSign(moduleName: string, originName?: string): string {
        if (!this.options) throw new Error(`use ModuleHashPlugin should write constructor options.`)
        let out: string = moduleName
        const { factory } = this.options as IStoreNamespaceFactoryOption
        if (factory) {
            return factory(moduleName, originName) || moduleName
        }

        const { prefix, suffix, hash } = this.options as IStoreNamespaceOption

        // > add prefix、suffix
        if (prefix) out = prefix + out
        if (suffix) out = out + suffix

        // ? module name hashing
        if (hash) {
            out = MD5(out, {}).toString()
            // ? 裁剪
            if (hash === 'simple') out = out.slice(0, 6)
        }
        return out
    }
}
