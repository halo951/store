import { App as VueApp, reactive } from 'vue'
import type { StoreManager, IStoreAdapter } from '@cp0/store'

export const storeSymbol = Symbol('$store')

export interface IStoreAdapterOptions {
    globalPropertyKey: '$store' | string
}

/** vue3 inject adapter */
export default class Vue3Adapter implements IStoreAdapter {
    globalPropertyKey: string = '$store'
    constructor(options?: IStoreAdapterOptions) {
        if (options?.globalPropertyKey) this.globalPropertyKey = options.globalPropertyKey
    }

    factory(store: StoreManager, app: VueApp): void {
        // > 通过 reactive 将 store['cache'].data 注册为可观测变量
        store['cache'].data = reactive({ data: store['cache'].data }).data
        // provide to VueApp
        app.provide(storeSymbol, store)
        // set globalProperties
        app.config.globalProperties[this.globalPropertyKey] = store
    }
}
