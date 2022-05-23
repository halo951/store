# @fdu/store-plugin-devtool

[![npm version](https://badge.fury.io/js/@fdu/store-plugin-devtool.svg)](https://badge.fury.io/js/@fdu/store-plugin-devtool)

## 功能

提供 Vue DevTool 支持. 支持 状态快照(state snapshot), 时间旅行(timeline event) 功能.

::: tip
注意, 需要配置生产环境禁用条件.
:::

## 安装

```bash

yarn add @fdu/store-plugin-devtool

```

## 使用

<CodeGroup>
  <CodeGroupItem title="推荐">

```typescript
import { StoreManager } from '@fdu/store'
import { StoreDevtoolPlugin } from '@fsdu/store-plugin-devtool'

export default class Store extends StoreManager {}

// 方式 1
export const store: Store = new Store({
    plugins: [
        // 注: 生产环境禁用
        new StoreDevtoolPlugin(process.env.NODE_ENV === 'production')
    ]
})

// 方式 2
export const store: Store = new Store({
    plugins: [
        //
        process.env.NODE_ENV !== 'production' ? new StoreDevtoolPlugin() : null
    ]
})
```

  </CodeGroupItem>
  <CodeGroupItem title="在 Class 中定义">

```typescript
import { StoreManager } from '@fdu/store'
import { StoreDevtoolPlugin } from '@fsdu/store-plugin-devtool'

export default class Store extends StoreManager {
    options = {
        plugins: [
            // 注: 生产环境禁用
            new StoreDevtoolPlugin(process.env.NODE_ENV === 'production')
        ]
    }
}

export const store: Store = new Store()
```

  </CodeGroupItem>
</CodeGroup>

## 参数/选项

### disabled

-   类型: `boolean`

-   默认值: `false`

-   描述: 是否禁用此插件 (注: 生产环境禁用需要手工指定)
