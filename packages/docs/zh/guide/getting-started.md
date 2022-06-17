# 快速入门

::: tip

上手前, 建议先通过[《什么是 Store?》](README.md) 这篇文章, 了解使用 Store 编程.

:::

## 安装

> 响应式数据依赖 adapter 提供支持, 请根据项目环境, 选择不同的适配器.
>
> ---
>
> 如果在 react、angualr 等其他环境下使用, 需要自行实现 adater 以达到响应式数据的能力。同时建议提交到官方库中, 供大家使用 ^.^

<CodeGroup>
  <CodeGroupItem title="vue3.x">

```bash

yarn add @fdu/store @fdu/store-adapter-vue3

```

  </CodeGroupItem>
  <CodeGroupItem title="vue2.x">

```bash

yarn add @fdu/store @fdu/store-adapter-vue2

```

  </CodeGroupItem>
  <CodeGroupItem title="react">

```bash

yarn add @fdu/store

```

  </CodeGroupItem>
  <CodeGroupItem title="小程序">

```bash

yarn add @fdu/store

```

  </CodeGroupItem>
</CodeGroup>

## 一个简单的 Demo

以应用包含: `app`, `user` 两个模块为例. Composition API 示例请参考[组合式 API 示例](.)

### catalog

```
.
|- main.ts --------------------------- 项目入口
|- define.ts ------------------------- 全局公共对象定义
|- /store ---------------------------- 逻辑(服务层)
    |- index.ts ---------------------- store聚合入口
    |- /modules ---------------------- 按实体特性定义的module目录
        |- app.ts
        |- ...
```

### code example

-   在 `/store/index.ts` 中, 创建 `Store`

```typescript
import { StoreManager } from '@fdu/store'

export class Store extends StoreManager {}
```

-   在 `/store/modules/app.ts` 中, 创建 `AppModule`

```typescript
import { StoreModule } from '@fdu/store'

/** 定义state模型 */
export interface IAppModel {
    version: string | null
}

/** 定义 AppModule, 处理 app 相关数据 */
export class AppModule extends StoreModule<IAppModel> {
    /** 必要方法, 初始化 state 定义 */
    initData(): IAppModel {
        return {
            version: null
        }
    }

    /** 提供版本号的 getter / setter 方法 */

    get version(): string | null {
        return this.state.version
    }

    set version(val: string) {
        // ! 可以通过 this.$commit, this.$patch 两种方式更新 state
        this.$commit('version', val)
    }
}
```

-   在 `/store/modules/user.ts` 中, 创建 `UserModule`

```typescript
import { StoreModule } from '@fdu/store'

export interface IUserModel {
    token: string
}

export class UserModule extends StoreModule<IUserModel> {
    /** 必要方法, 初始化 state 定义 */
    initData(): IAppModel {
        return {
            version: null
        }
    }
}
```
