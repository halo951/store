import { App as VueApp } from 'vue';
import type { StoreManager, IStoreAdapter } from '@cp0/store';
export declare const storeSymbol: unique symbol;
/** vue3 inject adapter */
export default class Vue3Adapter implements IStoreAdapter {
    factory(store: StoreManager, app: VueApp): void;
}
