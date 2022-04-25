import type { Vue2, App as VueApp } from 'vue-demi'
import type { IStorePlugin, StoreManager } from '@cp0/store/src/index'
/** @cp0/store vue-devtool 支持
 *
 * @description 基于 vuejs/devtool 6.x 版本实现
 * @support
 *  1. store tree node
 *  2. 时间旅行
 *
 */
export declare class StoreDevtoolPlugin implements IStorePlugin {
    /** store 实例 */
    private store
    /** dev tool api 实例 */
    /** 在挂载到vue节点时, 注册 vue devTool 逻辑
     *
     * @support 支持多 vue 实例集成
     * @description 通过 DevTool 提供的 timeline, custom inspector 能力实现
     */
    onBindedToVue(store: StoreManager, app: typeof Vue2 | VueApp): void
    /** 注册 node tree 功能 */
    private registerNodeTree
    /** 生成当前 store cache 的 nodeTree 集合
     * @param {string|undefined} query 过滤条件
     */
    private generateStoreCacheNodeTree
    /** 生成 StoreManager preview 属性 */
    private generateManagerState
    /** 生成 module state */
    private generateModuleState
    /** 安装 时间旅行 功能 */
    private registerTimeline
}
