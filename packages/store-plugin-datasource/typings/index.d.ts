import type { StoreManager, IStorePlugin, IData } from '@fdu/store';
export interface IStoreCacheDataProxy {
    [moduleName: string]: IData;
}
export interface IDatasourcePlugin {
    /** 自定义数据源工厂方法
     *
     * @param {IStoreCacheDataProxy} 原始数据源 (注: 也可能是其他插件处理后的 Proxy 对象)
     *
     * @returns 处理后的数据源对象
     */
    factory: (origin: IStoreCacheDataProxy) => IStoreCacheDataProxy;
}
/** 自定义数据源插件  */
export declare class StoreDatasourcePlugin implements IStorePlugin {
    options: IDatasourcePlugin;
    constructor(options: IDatasourcePlugin);
    onBefore(store: StoreManager): void;
}
