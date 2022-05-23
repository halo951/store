![npm](https://img.shields.io/npm/dw/@fdu/store-adapter-vue3.svg)
[![GitHub stars](https://img.shields.io/github/stars/halo951/store.svg?style=social&label=@fdu/store)](https://github.com/halo951/store)
[![npm version](https://badge.fury.io/js/@fdu/store-adapter-vue3.svg)](https://badge.fury.io/js/@fdu/store-adapter-vue3)

# @fdu/store-adapter-vue3

**Docs: [http://store.cp0.team](http://store.dtime.fun)**

## About

-   提供 `@fdu/store` 在 vue3.x \*\*环境下响应式支持.
-   Support `@fdu/store` reactive apply into Vue3.x.

## Usage

### 1. 安装 | install

```cmd
yarn add @fdu/store-adapter-vue3

# or

npm install @fdu/store-adapter-vue3
```

### 2. 配置 | configure to Store

```typescript
import { Vue3Adapter } from '@fdu/store-adapter-vue3'
// define Store
class Store extends StoreManager {}

// create
const store = new Store({
    adapter: new Vue3Adapter() // usage
})

// Vue.use
Vue.use(store)
```

### 3. Options

```typescript
export interface IStoreAdapterOptions {
    /** 作为option api的全局变量名称 */
    globalPropertyKey: '$store' | string
}
```

## FAQ

Q. 响应式实现机制?
A: 通过将 store['cache']数据源通过`reactive`注册为可观测变量, 实现响应式效果.
