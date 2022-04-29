import type { IData } from './data.intf';
/** store cache 接口定义 */
export interface IStoreCache {
    keys: {
        [moduleName: string]: Array<string>;
    };
    data: {
        [moduleName: string]: IData;
    };
}
