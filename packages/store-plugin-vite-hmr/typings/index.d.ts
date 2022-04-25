import type { StoreManager, IStorePlugin } from '@cp0/store/src/index'
/**
 * Creates an _accept_ function to pass to `import.meta.hot` in Vite applications.
 *
 *
 */
export declare function acceptHMRUpdate(stire: StoreManager, hot: any): (newModule: any) => void
/** vite hmr 插件 */
export declare class StoreViteHmrPlugin implements IStorePlugin {
    onReady(store: StoreManager): void
}
