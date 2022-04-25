# @cp0/store

[![npm version](https://badge.fury.io/js/@cp0/store.svg)](https://badge.fury.io/js/@cp0/store)

## What is @cp0/store

> 面向业务抽象的**Vue Store**工具, 一个极简的代码组织工具.

## About

-   core: 面向业务逻辑抽象的状态管理工具
-   support: vue2.x, vue3.x
-   feature: vuex 状态管理在 **class api** 范式下的替代工具, 优化面向类编程的友好度.
-   min: 极简, 核心代码仅 2kb.
-   design: 扁平化设计、插件化、默认集成 Storage 接口.

## Libary [http://www.baidu.com](http://www.baidu.com)

## Getting Started

### 定义

```typescript
import { StoreManager, StoreModule } from '@cp0/store'

// 定义 Model
export interface ITestModel {
    n: string | null
}

// 定义 store module
export class TestModule extends StoreModule<Store, ITestModel> {
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
