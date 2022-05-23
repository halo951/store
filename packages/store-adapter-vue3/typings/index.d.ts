import { App as VueApp } from 'vue-demi'
import type { StoreManager, IStoreAdapter } from '@fdu/store'
export declare const storeSymbol: unique symbol
export interface IStoreAdapterOptions {
    globalPropertyKey: '$store' | string
}
/** vue3 inject adapter */
export declare class Vue3Adapter implements IStoreAdapter {
    globalPropertyKey: string
    constructor(options?: IStoreAdapterOptions)
    factory(store: StoreManager, app: VueApp): void
}
