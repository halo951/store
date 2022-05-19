![npm](https://img.shields.io/npm/dw/@fdsu/store.svg)
[![GitHub stars](https://img.shields.io/github/stars/halo951/store.svg?style=social&label=@fdsu/store)](https://github.com/halo951/store)
[![npm version](https://badge.fury.io/js/@fdsu/store.svg)](https://badge.fury.io/js/@fdsu/store)

<h1 style="text-align: center;">@fdsu/store</h1>
<hr />
<p style="color: #ccc; text-align: center;">扁平化设计的 Store 工具. 支持 vue2.x、vue3.x</p>
<p style="color: #ccc; text-align: center;">Using flat design store to solve the problem of service abstraction. Support vue2.x、vue3.x!</p>

## Notes

**Document: [http://store.cp0.team](http://store.cp0.team)**

`@fdsu/store` 是用来解决现有 Store 工具面向类编程使用不便的解决方案.

## Support

-   **adapter**: 适用于 vue2.x, vue3.x, 并提供 `adapter interface` 支持, 可在其他渲染框架内使用(如: react)
-   **design**: 默认采用扁平化设计, 代码简洁, 易管理.
-   **study**: 仅包含 `StoreManager`,`StoreModule` 2 个核心模块, 熟悉 ESNext 新特性及 TS class 编程即可上手.
-   **ide**: Store 整体上就是一个`Class`, 支持一路点点点的代码检索, 没有比这个更丝滑的了!!!
-   **devtool**: 支持 vue-devtool, 提供 state 快照, 时间旅行功能.
-   **plugin**: 完全插件化, 支持插件任意拼接.
-   ***
-   **可见地**:
-   **灵活**:
-   原则: 让所有操作都有迹可循.

文笔有限, 欢迎补充...

## Adapters

> 通过适配器, 手工指定不同渲染框架的响应式实现方案.

-   [@fdsu/store-adapter-vue2](https://www.npmjs.com/package/@fdsu/store-adapter-vue2) | vue2.x 支持
-   [@fdsu/store-adapter-vue3](https://www.npmjs.com/package/@fdsu/store-adapter-vue3) | vue3.x 支持
-   `@fdsu/store-adapter-react` | 开发中, 目前卡在`subscription`实现上.

## Plugins

-   [@fdsu/store-plugin-encrypt](https://www.npmjs.com/package/@fdsu/store-plugin-encrypt) | 提供持久化数据加密能力
-   [@fdsu/store-plugin-module-sign](https://www.npmjs.com/package/@fdsu/store-plugin-module-sign) | 提供持久化数据命名空间能力, 解决多`Store`情况下, 持久化数据写入冲突问题.
-   [@fdsu/store-plugin-datasource](https://www.npmjs.com/package/@fdsu/store-plugin-datasource) | 提供自定义 Store 数据源能力
-   [@fdsu/store-plugin-devtool](https://www.npmjs.com/package/@fdsu/store-plugin-devtool) | 提供 vue-devtool 支持
-   [@fdsu/store-plugin-observer](https://www.npmjs.com/package/@fdsu/store-plugin-observer) | 观察者模式, 支持`composition api`
-   [@fdsu/store-plugin-vite-hmr](https://www.npmjs.com/package/@fdsu/store-plugin-vite-hmr) | 提供 vite hot reload 支持

## Road Map

-   **@fdsu/store-adapter-react** react 响应式适配器开发中. 目前卡在`subscription`实现上.

## What is @fdsu/store

> 一句话总结: `@fdsu/store` 是用来解决 `vuex`, `pina` 使用复杂度以及对 `class api` 范式不友好的解决方案.

-   引用

```
// vuex

// pinia
Pinia 是 Vue 的存储库，它允许您跨组件/页面共享状态。
```

## About

-   tags: `扁平化设计`, `逻辑(服务)抽象`, `状态管理/传递工具`
-   scene: vue2.x, vue3.x, 提供 adapter interface 支持
-   feature: vuex 状态管理在 **class api** 范式下的替代工具, 优化面向类编程的友好度.
-   min: 极简, 核心代码仅 2kb.
-   design: 扁平化设计、插件化、默认集成 Storage 接口.

## Getting Started

### 定义

```typescript
import { StoreManager, StoreModule } from '@fdsu/store'

// 定义 Model
export interface ITestModel {
    n: string | null
}

// 定义 store module
export class TestModule extends StoreModule<ITestModel> {
    initData(): ITestModel {
        return {
            n: null
        }
    }
    get n(): string | null {
        return this.state.n
    }

    set n(n: string) {
        this.$commit('n', n)
    }

    // action
    addSuffix(suffix: string): void {
        let n = this.n + suffix
        this.$commit('n', n)
    }
}

// 定义 Store
export class Store extends StoreManager {
    test: TestModule = new TestModule()
}
export const store: Store = new Store()
```

### 使用

```typescript
import { Options, Vue } from 'vue-property-decorators'
import { store } from './store'

// 挂载到 vue2
Vue.use(store)

// 挂载到 vue3
// app.use(store)

// 在组件中使用 (vue2), 建议搭配 vue-property-decorator 库使用
@Options()
export default class extends Vue {
    /** computed */
    get n() {
        return store.test.n
    }

    /** methods */
    func(): void {
        store.test.addSuffix('haha')
    }
}
```

## Usage

## Road Map

-   增加 react 场景下使用的 adapter
-   补全缺少的 vue-devtool actions 调用的 timeline event.
-   通过代理, 增加 StoreModule 对外暴露的属性/方法监听
-   Store 的 `cache` 属性, 可以被绕过原始属性修改. 需要参考 vuex 的实现, 改变为仅允许通过 commit 更新.
