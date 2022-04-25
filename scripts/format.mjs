import prettier from 'prettier'
import config from '../prettier.config.js'

/** 格式化 */
export const format = (source, { parser }) => prettier.format(source, { ...config, parser })
