import type { StoreManager, IStorePlugin, IData } from '@cp0/store/src/index'

export interface IStoreCacheDataProxy {
    [moduleName: string]: IData
}

export interface IDatasourcePlugin {
    factory: (origin: IStoreCacheDataProxy) => IStoreCacheDataProxy
}

/** 自定义数据源插件  */
export class StoreDatasourcePlugin implements IStorePlugin {
    options!: IDatasourcePlugin
    constructor(options: IDatasourcePlugin) {
        this.options = options
    }

    onBeforeInit(store: StoreManager): void {
        // ? 参数检查
        if (typeof this.options?.factory !== 'function') {
            throw new Error("StoreDatasourcePlugin | This 'factory' is not a function.")
        }
        const datasource: IStoreCacheDataProxy = this.options.factory(store['cache'].data)
        // ? 返回结果检查
        if (!datasource || typeof datasource !== 'object') {
            throw new Error("StoreDatasourcePlugin | This 'factory' result type should be IStoreCacheData")
        }
        // ? 完整性检查
        for (const mod of store['modules']) {
            // ? 模块完整性检查
            if (!datasource[mod]) throw new Error(`StoreDatasourcePlugin | Missing '${mod}' module data`)
            // ! 数据源完整性检查暂不考虑.
        }
        // > cover
        store['cache'].data = datasource
    }
}
