/** 获取set-value时, 首个key
 *
 * @description 用于写入参数定义校验
 */
export const getFirstPropKey = (input, options = {}) => {
    const sep = options.separator || '.';
    const preserve = (sep === '/' ? false : options.preservePaths);
    if (typeof input === 'string' && preserve !== false && /\//.test(input)) {
        return input;
    }
    else if (input instanceof Array) {
        input = input.join(sep);
    }
    let part = '';
    for (let i = 0; i < input.length; i++) {
        const value = input[i];
        if (value === '\\') {
            part += input[++i];
            continue;
        }
        if (value === sep || value === '[')
            break;
        part += value;
    }
    return part;
};
/** 检查类方法是否定义 */
export const requiredFunctionDefined = (className, obj, required) => {
    for (const key of required) {
        if (!obj[key])
            throw new Error(`${className} ${key} is required.`);
    }
};
