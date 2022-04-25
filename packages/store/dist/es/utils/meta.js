/** meta data util
 *
 * @description Used to restrict submission operations only through `commit` or `patch`
 */
/** 创建 deep proxy, 用于安全的值变更操作 */
export const createDeepProxy = (obj) => {
    return new Proxy(obj, {
        get(target, key, receiver) {
            let value = Reflect.get(target, key, receiver);
            if (typeof value === 'object')
                value = createDeepProxy(value);
            return value;
        },
        set(target, key, value, receiver) {
            if (value.__proto__.meta)
                return Reflect.set(target, key, value, receiver);
            throw new Error(`StoreModule change value need to be '$commit' or '$patch'`);
        }
    });
};
/** 添加元数据 */
export const addMetaData = (origin, meta) => {
    const write = (obj) => {
        obj.__proto__.meta = meta;
        return obj;
    };
    return typeof origin === 'object' ? write(origin) : write(Object(origin));
};
