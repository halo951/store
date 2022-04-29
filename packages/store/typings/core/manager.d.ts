import type { IStoreOptions } from '../intf/options.intf';
/** StoreManager */
export declare abstract class StoreManager {
    /** store options */
    protected options: IStoreOptions;
    /** 是否初始化完成 */
    private ready?;
    /** 缓存/数据源 */
    private readonly cache;
    /** get all module name */
    private get modules();
    constructor(options?: IStoreOptions);
    /** 安装
     *
     * @description 允许脱离 vue 单独使用, 但脱离 vue 使用时, 需要先执行 store.install() 操作.
     * @support 支持 vue2.x, vue3.x, 及独立使用.
     */
    install(app?: any): this;
    /** 清除模块数据并重新初始化
     *
     * @param {Array<string>} specifyModules 可选, 不填则清除所有数据
     */
    $clear(specifyModules?: Array<string>): void;
    /** 初始化 */
    private init;
    /** calc module hash
     *
     * @description transform origin module name to `module hsah`, and be used for data storage.
     */
    private generateModuleSign;
    /** injectFactory
     *
     * @description use function mapping realization StoreModule abstract function.
     */
    private injectFactory;
    /** data prepare */
    private prepare;
    /** data persistence */
    private persistence;
    /** 向插件推送生命周期变化 */
    private emit;
}
