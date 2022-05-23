import type Vue2 from 'vue';
import type { StoreManager, IStoreAdapter } from '@fdu/store';
export interface IStoreAdapterOptions {
    globalPropertyKey: '$store' | string;
}
/** vue2 inject adapter */
export declare class Vue2Adapter implements IStoreAdapter {
    globalPropertyKey: string;
    constructor(options?: IStoreAdapterOptions);
    factory(store: StoreManager, app: typeof Vue2): void;
}
