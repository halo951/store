import type { IStorePlugin } from '@fdsu/store/src/index'

import { MD5 } from 'crypto-js'

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
export class StoreModuleHashPlugin implements IStorePlugin {
    options!: IStoreModuleHashOptions

    constructor(options: IStoreModuleHashOptions) {
        this.options = options
    }

    /** 自定义模块签名
     *
     * @description 用于自定义持久化模块签名
     * @returns {string} 转换过的签名
     */
    transformModuleHash(moduleName: string, originName?: string): string {
        if (!this.options) throw new Error(`use ModuleHashPlugin should write constructor options.`)
        let out: string = moduleName
        const { prefix, suffix, hash } = this.options

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
