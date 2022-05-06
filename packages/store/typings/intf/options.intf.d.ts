import type { IStoreAdapter } from './adapter.intf';
import type { IStorePlugin } from './plugin.intf';
/** store 构造参数定义 */
export interface IStoreOptions {
    /** 数据版本号
     *
     * @description 如果碰到新旧数据冲突(持久化数据)的场景, 可通过修改版本号使旧数据失效. 版本号可通过: process.env.VUE_APP_VERSION 设置
     */
    version?: string;
    /** 适配器选项
     *
     * @description 提供不同框架/版本下 响应式支持.
     *
     * @libs @fdsu/store-adapter-vue2 | @fdsu/store-adapter-vue3
     */
    adapter?: IStoreAdapter;
    /** 插件选项
     *
     * @description 也可以通过定义在 `Store` 中的 plugins 字段引用插件
     */
    plugins?: Array<IStorePlugin>;
}
