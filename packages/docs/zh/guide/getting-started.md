# 快速上手

首先, 这篇文档建立在初步了解 Store 模式的基础上引导的. 如果, 不了解`Store`相关的知识点, 请先阅读[这篇文章](framework.md)简单了解 Store 模式.

## 示例环境

-   vue3.x
-   typescript

## 安装

> 响应式数据依赖 adapter 提供支持, 请根据项目环境, 选择不同的适配器.
>
> 如果在 react、angualr 等其他环境下使用, 需要自行实现 adater 以达到响应式数据的能力。同时建议提交到官方库中, 供大家使用 ^.^

<CodeGroup>
  <CodeGroupItem title="vue3.x">

```bash

yarn add @fdsu/store @fdsu/store-adapter-vue3

```

  </CodeGroupItem>
  <CodeGroupItem title="vue2.x">

```bash

yarn add @fdsu/store @fdsu/store-adapter-vue2

```

  </CodeGroupItem>
</CodeGroup>

## 在项目中使用

### 目录结构

```
.
|- main.ts
|- /store
    |- index.ts
    |- /modules
        |- UserModule.ts
        |- AppModule.ts
        |- YourModule.ts
        |- ...
```

### Code

-   store/index.ts

首先, 创建一个 Store 类, 需要继承 `StoreManager`

```typescript
import { StoreManager } from '@fdsu/store'
/** 定义 store */
export default class Store extends StoreManager {}
```

---

-   UserModule.ts

然后, 定义一个 Module 来处理 Store 的逻辑。 一般情况下, 根据业务拆分模块即可. 其中, 需要定义以下元素:

> -   数据模型 (interface) | 通过 `interface` 或者 `type` 定义.
> -   Module 类 | 需要继承 StoreModule , 泛型的第一个参数为`Store`类型引用, 第二个为`数模接口(IUserModel)`
> -   initData() 方法 | 用来初始化状态数据.

::: tip

-   如果是在 JS 环境下使用, 那么需要删除泛型定义.
-   与 `vuex`, `pinia` 概念对比, 请参考 [传送门](diff.md)

:::

```typescript
import { StoreModule } from '@fdsu/store'
import type Store from '..' // 注意, 为了使用 .parent 变量, 我们需要借助泛型方式, 导入Store的类型定义.

/** 定义 module 的数据模型
 *
 */
export interface IUserModel {
    token: string | null
}

/** 定义 module */
export class UserModule extends StoreModule<Store, IUserModel> {
    /** 初始化 state 数据 */
    initData(): IUserModel {
        return {
            // 给定初始值, 支持任意类型
            token: null
        }
    }

    /** 通过 getter/setter 对外部访问状态 提供控制
     *
     * 参考 vuex 的 getter 和
     */
    get token(): string | null {
        return this.state.token
    }

    set token(val: string) {
        this.$commit('token', string)
    }

    /*  actions |  不需要复杂的 dispath 调用, 只需定义好方法即可. */

    /** 例: 登录方法 */
    async login(): Promise<void> {
        // TODO
    }
}
```

---

-   store/index.ts

回到上一个文件, 我们要进行 3 步操作

> 1.  引用 UserModule
> 2.  实例化 Store
> 3.  配置 adapter (注: vue2.x 请使用 [@fdsu/store-adapter-vue2](#安装))

```typescript
import { StoreManager } from '@fdsu/store'
import { Vue3Adapter } from '@fdsu/store-adapter-vue3'
import { UserModule } from './modules/UserModule'
/** 定义 store */
export default class Store extends StoreManager {
    /** 1. 引用, 并实例化UserModule */
    user: UserModule = new UserModule()
}

// 2. 实例化Store
export const store: Store = new Store({
    // 3. 配置 adapter
    adapter: Vue3Adapter
})
```

-   main.ts

最后一步, 使用 `use` 方法挂载到 Vue 实例上.

> vue2.x 中 这一步也可以写到 `./store/index.ts` 中

```typescript
import { createApp } from 'vue'
import { store } from './store'
// 在 vue3.x 使用
const app = createApp(App)
app.use(store)

// 在 vue2.x 使用
// Vue.use(store)
```

### 组件中, 使用示例

-   Composition API 方式 (setup)

```vue
<template>
    <div>{{ store.user.token }}</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { store } from '@/store'

// 调用 action
onMounted(() => store.user.login())
</script>
```

-   在使用 `vue-property-decorator`的 Vue 组件中使用

> 建议创建一个 `BaseComponent` 解决问题.

```vue
<template>
    <div>
        <div>{{ store.user.token }}</div>
        <div>{{ token }}</div>
    </div>
</template>

<script lang="ts">
import { Vue, Option } from 'vue-property-decorator'
import { store } from '@/store'

@Option()
export default class extends Vue {
    /** 直接获取store引用 (不建议) */
    get store() {
        return store
    }

    get token(): string {
        return store.user.token
    }

    mounted(): void {
        // 调用action
        store.user.login()
        // 直接修改值 (需要 Module 暴露 setter 方法)
        store.user.token = 'todo'
    }
}
</script>
```

-   通过 Options Api 使用

> 注: 已经按照官方 API 注入了全局变量 `this.$store`, 如果在 ts 中使用. 需要定义 `shims-store.d.ts`

```typescript
<script lang="ts">
export default {
    mounted() {
        this.$store.user.token
    }
}
</script>
```

-   shims-store.d.ts (vue3.x)

```typescript
import Store from './store'

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $store: Store
    }
}
```

-   shims-store.d.ts (vue2.x)

```typescript
import Store from './store'

declare module 'vue/types/vue' {
    export interface Vue {
        $store: Store
    }
}
```

## 学习更多使用方式

[传送门](diff.md)
