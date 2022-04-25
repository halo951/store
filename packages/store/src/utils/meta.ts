/** meta data util
 *
 * @description Used to restrict submission operations only through `commit` or `patch`
 */

/** 创建 deep proxy, 用于安全的值变更操作 */
export const createDeepProxy = <T extends Object>(obj: T): T => {
    return new Proxy<T>(obj, {
        get(target: any, key, receiver) {
            let value = Reflect.get(target, key, receiver)
            if (typeof value === 'object') value = createDeepProxy(value)
            return value
        },
        set(target, key, value, receiver) {
            if (value.__proto__.meta) return Reflect.set(target, key, value, receiver)
            throw new Error(`StoreModule change value need to be '$commit' or '$patch'`)
        }
    })
}

/** 添加元数据 */
export const addMetaData = <T>(origin: T, meta: string): T => {
    const write = (obj: any) => {
        obj.__proto__.meta = meta
        return obj
    }
    return typeof origin === 'object' ? write(origin) : write(Object(origin))
}
