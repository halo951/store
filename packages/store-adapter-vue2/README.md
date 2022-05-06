![npm](https://img.shields.io/npm/dw/@fdsu/store-adapter-vue2.svg)
[![GitHub stars](https://img.shields.io/github/stars/halo951/store.svg?style=social&label=@fdsu/store)](https://github.com/halo951/store)
[![npm version](https://badge.fury.io/js/@fdsu/store-adapter-vue2.svg)](https://badge.fury.io/js/@fdsu/store-adapter-vue2)

<h1 style="text-align: center;">@fdsu/store-adapter-vue2</h1>
<hr />
<p style="color: #ccc; text-align: center;">提供<b>@fdsu/store</b>在 vue2.x **环境下响应式支持</p>
<p style="color: #ccc; text-align: center;">Support <b>@fdsu/store</b> reactive apply into Vue2.x</p>

## Notes

**Document: [http://store.cp0.team](http://store.cp0.team)**

- 通过 Vue.mixin 混入方式, 

## Usage

#### 1. 安装 | install

```cmd
yarn add @fdsu/store-adapter-vue2

# or

npm install @fdsu/store-adapter-vue2
```

#### 2. 配置 | configure to Store

```typescript
import Vue2Adapter from '@fdsu/store-adapter-vue2'
// define Store
class Store extends StoreManager {}

// create
const store = new Store({
    adapter: new Vue2Adapter() // usage
})

// Vue.use
Vue.use(store)
```
