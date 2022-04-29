import type Vue2 from 'vue'
import type { StoreManager, IStoreAdapter } from '@cp0/store'

export interface IStoreAdapterOptions {
    globalPropertyKey: '$store' | string
}

/** vue2 inject adapter */
export default class Vue2Adapter implements IStoreAdapter {
    globalPropertyKey: string = '$store'
    constructor(options?: IStoreAdapterOptions) {
        if (options?.globalPropertyKey) this.globalPropertyKey = options.globalPropertyKey
    }

    factory(store: StoreManager, app: typeof Vue2): void {
        // > transform origin data to vue observabled data.
        app.observable(store['cache'].data)
        app.prototype[this.globalPropertyKey] = store
        // 旧实现, 因为mixin方式, 每次组件创建时都要触发, 相比于注册为可观测变量, 消耗资源更多.
        // app.mixin({
        //     data(): { $STORE_CACHE: any } {
        //         return { $STORE_CACHE: $store['cache'].data }
        //     },
        //     beforeCreate(): void {
        //         ;(this as any)['$store'] = $store
        //     }
        // })
    }
}
