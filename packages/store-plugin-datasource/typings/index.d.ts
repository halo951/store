import type { StoreManager, IStorePlugin, IData } from '@cp0/store/src/index';
export interface IStoreCacheDataProxy {
    [moduleName: string]: IData;
}
export interface IDatasourcePlugin {
    factory: (origin: IStoreCacheDataProxy) => IStoreCacheDataProxy;
}
/** 自定义数据源插件  */
export declare class StoreDatasourcePlugin implements IStorePlugin {
    options: IDatasourcePlugin;
    constructor(options: IDatasourcePlugin);
    onBefore(store: StoreManager): void;
}
