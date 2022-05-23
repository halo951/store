# @fdu/store-plugin-encrypt

[![npm version](https://badge.fury.io/js/@fdu/store-plugin-encrypt.svg)](https://badge.fury.io/js/@fdu/store-plugin-encrypt)

## 功能

通过 `crypto-js` AES 加/解密方式提供持久化数据加密能力

-   加密方式: `AES`

::: tip

如需其他加密方式, 可以参考此插件实现一个新的 Plugin

:::

## 安装

```bash

yarn add @fdu/store-plugin-encrypt

```

## 使用

<CodeGroup>
  <CodeGroupItem title="推荐">

```typescript
import { StoreManager } from '@fdu/store'
import { StoreEncryptPlugin } from '@fsdu/store-plugin-encrypt'

export default class Store extends StoreManager {}

export const store: Store = new Store({
    plugins: [new StoreEncryptPlugin({ key: 'xxx' /* 秘钥 */ })]
})
```

  </CodeGroupItem>
  <CodeGroupItem title="在 Class 中定义">

```typescript
import { StoreManager } from '@fdu/store'
import { StoreEncryptPlugin } from '@fsdu/store-plugin-encrypt'

export default class Store extends StoreManager {
    options = {
        plugins: [new StoreEncryptPlugin({ key: 'xxx' /* 秘钥 */ })]
    }
}

export const store: Store = new Store()
```

  </CodeGroupItem>
</CodeGroup>

## 参数/选项

```typescript
/** plugin options */
export interface IStoreEncryptOptions {
    /** AES 对称加密 key 参数 */
    key: string
}
```
