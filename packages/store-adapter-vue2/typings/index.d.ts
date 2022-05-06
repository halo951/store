import Vue2 from 'vue';
import type { StoreManager, IStoreAdapter } from '@fdsu/store';
/** vue2 inject adapter */
export default class Vue2Adapter implements IStoreAdapter {
    factory($store: StoreManager, app: typeof Vue2): void;
}
