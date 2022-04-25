/** meta data util
 *
 * @description Used to restrict submission operations only through `commit` or `patch`
 */
/** 创建 deep proxy, 用于安全的值变更操作 */
export declare const createDeepProxy: <T extends Object>(obj: T) => T
/** 添加元数据 */
export declare const addMetaData: <T>(origin: T, meta: string) => T
