import type { IStorePlugin, IData } from '@cp0/store/src/index'

import { AES, enc } from 'crypto-js'

/** plugin options */
export interface IStoreEncryptOptions {
    /** AES 对称加密 key 参数 */
    key: string
}

/** @cp0/store 持久化数据加密插件
 *
 * @description 基于 CryptoJs.AES 进行对称加密
 */
export class StoreEncryptPlugin implements IStorePlugin {
    options!: IStoreEncryptOptions

    constructor(options: IStoreEncryptOptions) {
        this.options = options
    }

    /** 读取持久化数据处理
     *
     * @description 在准备数据阶段, 对读取到的持久化数据进行还原操作
     * @returns {any} 已还原的数据
     */
    transformPrepare?(data: any, origin?: any): any {
        if (!this.options?.key) throw new Error(`The required 'key' parameter is missing.`)
        let out: any = data
        // > decrypt
        out = AES.decrypt(out, this.options.key).toString(enc.Utf8)
        return JSON.parse(out)
    }

    /** 持久化数据处理, 需要搭配`transformPrepare` 使用
     *
     * @description 用于对持久化数据进行加密/脱敏等操作
     * @returns {any} 转换过的持久化数据
     */
    transformPersistence?(data: IData | string, origin?: any): any {
        if (!this.options?.key) throw new Error(`The required 'key' parameter is missing.`)
        // ? 如果, IData 中缺少指定的数据, 则跳过加密
        if (data === undefined || data === null) return data
        if (typeof data === 'object' && Object.keys(data).length === 0) return data

        let out: any = data

        // > encrypt
        out = AES.encrypt(JSON.stringify(data), this.options.key).toString()
        return out
    }
}
