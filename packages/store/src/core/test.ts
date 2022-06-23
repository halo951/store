import { IStorePlugin } from 'src/intf/plugin.intf'

interface IStoreOptions {
    /** 版本号 */
    version?: string
    /** 适配器 */
    adapter: any
}

const generateModuleSign = () => {}
const injectFactory = () => {}

export interface StoreManager {
    [key: string]: any
    options: IStoreOptions
    plugins: Array<IStorePlugin>
    modules: Array<string>
    install(): this
    $clear(mod?: Array<string> | string): void
    emit(): void
}
