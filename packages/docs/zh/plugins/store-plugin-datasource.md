# @fdsu/store-plugin-datasource

[![npm version](https://badge.fury.io/js/@fdsu/store-plugin-datasource.svg)](https://badge.fury.io/js/@fdsu/store-plugin-datasource)

## 功能

提供 Store 自定义数据源支持, 支持数据源嵌套, 但应注意处理后的对象应保留原始的访问结构. 避免 Store 处理报错.

## 安装

```bash

yarn add @fdsu/store-plugin-datasource

```

## 使用

<CodeGroup>
  <CodeGroupItem title="推荐">

```typescript
import { StoreManager } from '@fdsu/store'
import { StoreDatasourcePlugin, IStoreCacheDataProxy } from '@fsdu/store-plugin-datasource'

export default class Store extends StoreManager {}

export const store: Store = new Store({
    plugins: [
        new StoreDatasourcePlugin({
            // 通过工厂方法, 代理 Store 缓存数据源
            factory: (origin: IStoreCacheDataProxy): IStoreCacheDataProxy => {
                // TODO
                return origin
            }
        })
    ]
})
```

  </CodeGroupItem>
  <CodeGroupItem title="在 Class 中定义">

```typescript
import { StoreManager } from '@fdsu/store'
import { StoreDatasourcePlugin, IStoreCacheDataProxy } from '@fsdu/store-plugin-datasource'

export default class Store extends StoreManager {
    options = {
        plugins: [
            new StoreDatasourcePlugin({
                // 通过工厂方法, 代理 Store 缓存数据源
                factory: (origin: IStoreCacheDataProxy): IStoreCacheDataProxy => {
                    // TODO
                    return origin
                }
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
export interface IDatasourcePlugin {
    /** 自定义数据源工厂方法
     *
     * @param {IStoreCacheDataProxy} 原始数据源 (注: 也可能是其他插件处理后的 Proxy 对象)
     *
     * @returns 处理后的数据源对象
     */
    factory: (origin: IStoreCacheDataProxy) => IStoreCacheDataProxy
}
```
