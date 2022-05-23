# 新手上路

> 此处, 以 vue3.x 为例. 讲解 `@fdu/store` 的基础使用.

在`@fdu/store`中, Store 概念的核心, 在于**管理**和**抽象**. 在一个 `Store` 下面, 可以存在多个不同定义

##

-   安装核心依赖

```cmd
yarn add @fdu/store
# or
npm install @fdu/store -i
```

-   安装适配器 (响应式支持)

```cmd
# vue2
yarn add @fdu/store-adapter-vue2

# vue3
yarn add @fdu/store-adapter-vue3

```

> 其他如 react, angualr 需要实现 `IStoreAdapter` 接口.

## Create a Store

接下来, 要创建你的第一个 Store

-   目录结构

```
|- ./src
    |- /store
        |- index.ts
        |- /modules
            |- [your module].ts
            |- 例: UserModule.ts
            |- ...
```

-   简单创建一个实例

> 推荐格式, 请参考: `playground`

```typescript
import { StoreManager, StoreModule } from '@fdu/store'

/** 定义 Store */
export class Store extends StoreManager {}

/** 定义 Store */
```

-   创建 `StoreModule`

```typescript
import {Store}
```

## Usage in Vue

#### 在 `Composition API` 模式下使用.

#### 在采用 `vue-property-decorator`的 Vue class 中使用.

1. 创建 BaseComponent

2. invoke storage.

-   在 `vue-property-decorator`中使用.
