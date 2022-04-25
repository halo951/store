import type { StoreManager, IStorePlugin } from '@cp0/store/src/index'

/**
 * Creates an _accept_ function to pass to `import.meta.hot` in Vite applications.
 *
 *
 */
export function acceptHMRUpdate(stire: StoreManager, hot: any) {
    return (newModule: any) => {}
}

/** vite hmr 插件 */
export class StoreViteHmrPlugin implements IStorePlugin {
    onReady(store: StoreManager): void {}
}
