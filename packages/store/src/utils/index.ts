import type { Options } from 'set-value'

/** 获取set-value时, 首个key
 *
 * @description 用于写入参数定义校验
 */
export const getFirstPropKey = (input: string | Array<string | number>, options: Options = {}): string => {
    const sep: string = options.separator || '.'
    const preserve: boolean = (sep === '/' ? false : options.preservePaths) as boolean

    if (typeof input === 'string' && preserve !== false && /\//.test(input)) {
        return input
    } else if (input instanceof Array) {
        input = input.join(sep)
    }

    let part: string = ''

    for (let i = 0; i < input.length; i++) {
        const value = input[i]

        if (value === '\\') {
            part += input[++i]
            continue
        }

        if (value === sep || value === '[') break

        part += value
    }

    return part
}

/** 检查类方法是否定义 */
export const requiredFunctionDefined = (className: string, obj: any, required: Array<string>): void => {
    for (const key of required) {
        if (!obj[key]) throw new Error(`${className} ${key} is required.`)
    }
}
