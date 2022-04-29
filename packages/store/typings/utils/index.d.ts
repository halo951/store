import type { Options } from 'set-value';
/** 获取set-value时, 首个key
 *
 * @description 用于写入参数定义校验
 */
export declare const getFirstPropKey: (input: string | Array<string | number>, options?: Options) => string;
/** 检查类方法是否定义 */
export declare const requiredFunctionDefined: (className: string, obj: any, required: Array<string>) => void;
