# scene - 解决存在多个 Store 时的持久化问题.

## 问题描述

同一个项目下, 同时存在多个 App. 或者通过微前端概念, 将多个 App 聚合到同一服务下的场景. 并且, **在不同的场景中引用同一个或不同的`Store`**。

### 场景

1.  同一个`Store`实例, 被不同的`App`引用. (这种情况, 不需要额外处理)
2.  同一服务(应用)下, 存在多个`Store`定义.
3.  同一个`Store`被多次实例化, 然后被 1 个或多个 App 引用.

> 注: 场景 3 可以看做场景 2 的变体, 相当于对于同一组 StoreModule, 定义了 2 个不同的 Manager. 问题的重心仍然在于数据持久化冲突.

## 开发注意事项

当处于上述场景下, 需要注意如下问题:

-   `Store` 持久化的 Module 会产生命名冲突, 进而产生数据污染问题 (注:1)
-   `@fdu/store-plugin-observer` 观察者插件, 通过 composition api 注册事件时, 会拦截到同一服务下所有`Store`产生的事件, 请注意!

    注:

    1.  由于存入 Storage 中的对象将以 StoreModule 的 name 属性存储, 所以, 当存在同名 StoreModule 时, 后进行的 commit 将覆盖其他 Store 产生的记录.

## 解决方案

### 手工解决思路

问题的根源在于 StoreModule 命名冲突, 尽量在约定 StoreModule 的 name 时, 约定好命名规则, 避免冲突.

### 通过插件解决

通过 `@fdu/store-plugin-module-sign` 插件, 使`Store`的持久化数据具备不同的签名(key)

#### 安装

```bash:no-line-numbers
yarn add @fdu/store-plugin-module-sign
```

#### 使用

```typescript
import { StoreManager } from '@fdu/store'
import { StoreModuleSignPlugin } from '@fdu/store-plugin-module-sign'

export class Store extends StoreManager {
    // TODO
}

export const store: Store = new Store({
    plugins: [
        new StoreModuleSignPlugin({
            prefix: '', // 定义不同的前缀 or 后缀, 2选1即可.
            suffix: ''
        })
    ]
})
```
