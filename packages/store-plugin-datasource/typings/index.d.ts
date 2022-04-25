import type { StoreManager, IStorePlugin, IData } from '@cp0/store/src/index'
export interface IStoreCacheData {
    [moduleName: string]: IData
}
export interface IDatasourcePlugin {
    factory: (origin: IStoreCacheData) => IStoreCacheData
}
/** 自定义数据源插件  */
export declare class StoreDatasourcePlugin implements IStorePlugin {
    options: IDatasourcePlugin
    constructor(options: IDatasourcePlugin)
    onBeforeInit(store: StoreManager): void
}
