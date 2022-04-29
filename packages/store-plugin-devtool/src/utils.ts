export const createObjectEmitter = <T extends Object>(
    obj: T,
    emitter: (target: any, key: string | Symbol, value: any) => void
): T => {
    return new Proxy<T>(obj, {
        get(target: any, key, receiver) {
            let value = Reflect.get(target, key, receiver)
            if (typeof value === 'object') value = createObjectEmitter(value, emitter)
            return value
        },
        set(target, key, value, receiver) {
            emitter(target, key, value)
            return Reflect.set(target, key, value, receiver)
        }
    })
}
