# @fdu/store-plugin-module-sign

[![npm version](https://badge.fury.io/js/@fdu/store-plugin-module-sign.svg)](https://badge.fury.io/js/@fdu/store-plugin-module-sign)

## 功能

提供模块自定义签名能力, 一般用于处理同一站点下存在多个 Store 的场景.

-   prefix: 支持持久化 key 添加自定义前缀
-   suffix: 支持持久化 key 添加自定义后缀
-   hash: 支持持久化 key 转化为 Hash 值 (通过 MD5)

::: tip

默认情况下, Store 不具备命名空间概念, 或者说以当前域名为命名空间。 持久化数据储存到 Storage 时, 会采用自身的 name 作为存储值的 key。

此时, 如果存在其他 Store, 且采用了相同的 name 则会产生持久化数据互相覆盖的问题。 可以通过此插件为持久化数据增加 `prefix` 或 `suffix` 解决这个问题, 等效于为持久化数据指定命名空间

:::

## 安装

```bash

yarn add @fdu/store-plugin-module-sign

```

## 使用

<CodeGroup>
  <CodeGroupItem title="推荐">

```typescript
import { StoreManager } from '@fdu/store'
import { StoreModuleSignPlugin } from '@fsdu/store-plugin-module-sign'

export default class Store extends StoreManager {}

export const store: Store = new Store({
    plugins: [
        new StoreModuleSignPlugin({
            /* 按需指定 prefix, suffix, hash */
        })
    ]
})
```

  </CodeGroupItem>
  <CodeGroupItem title="在 Class 中定义">

```typescript
import { StoreManager } from '@fdu/store'
import { StoreModuleSignPlugin } from '@fsdu/store-plugin-module-sign'

export default class Store extends StoreManager {
    options = {
        plugins: [
            new StoreModuleSignPlugin({
                /* 按需指定 prefix, suffix, hash */
            })
        ]
    }
}

export const store: Store = new Store()
```

  </CodeGroupItem>
</CodeGroup>

## 参数/选项

```typescript
/** plugin options */
export interface IStoreModuleHashOptions {
    /** store module 数据持久化前缀 */
    prefix?: string
    /** store module 数据持久化后缀 */
    suffix?: string
    /** 对 持久化存储的 module key, 进行 */
    hash?: boolean | 'simple' | 'lang'
}
```
