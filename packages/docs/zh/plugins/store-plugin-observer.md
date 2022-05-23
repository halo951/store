# @fsdu/store-plugin-observer

[![npm version](https://badge.fury.io/js/@fdu/store-plugin-observer.svg)](https://badge.fury.io/js/@fdu/store-plugin-observer)

## 功能

> <font color='red'>这是一个复杂功能, 工具的本意是为了简化操作, 所以此插件一般情况下不推荐使用。</font>
>
> 实际开发中, 更建议大家通过 `装饰器` 方式, 对 action 行为进行拦截.

提供 Store 观察者模式支持. 允许使用者通过事件定义, 监听 `action` 调用行为及对 `$commit`, `$patch` 提交的过滤操作。

支持通过 `Composition API` 方式添加事件监听

::: tip

此插件的灵感来源于 Pinia 的行为监听, 不同的时, Pinia 监听的 Function 的调用, 而这里则是通过 Proxy 的方式, 对 module 的调用进行捕获处理.

:::

## 事件支持

-   监听 action 行为触发前
-   监听 action 行为触发后
-   $commit 提交拦截器
-   $patch 提交拦截器

> 注: 没有去做状态变更监听, 这个可以借助 vue 的 `watch` 实现.

## 安装

```bash

yarn add @fdu/store-plugin-observer

```

## 使用

建议通过下方 Composition API 方式, 注册事件监听

<CodeGroup>
  <CodeGroupItem title="推荐">

```typescript
import { StoreManager } from '@fdu/store'
import { StoreObserverPlugin } from '@fsdu/store-plugin-observer'

export default class Store extends StoreManager {}

export const store: Store = new Store({
    plugins: [new StoreObserverPlugin()]
})
```

  </CodeGroupItem>
  <CodeGroupItem title="在 Class 中定义">

```typescript
import { StoreManager } from '@fdu/store'
import { StoreObserverPlugin } from '@fsdu/store-plugin-observer'

export default class Store extends StoreManager {
    options = {
        plugins: [
            new StoreObserverPlugin({
                /* 此处可以定义全局事件 */
            })
        ]
    }
}

export const store: Store = new Store()
```

  </CodeGroupItem>
</CodeGroup>

## 示例

#### 通过 Composition API 方式注册事件

> 注: 需要先在 Store 中定义插件, 否则不会生效.

-   注册 action 行为触发前监听

```typescript
import { registerActionBeforeEvent, IActionBeforeEvent } from '@fsdu/store-plugin-observer'
registerActionBeforeEvent({
    modules: [], // 指定监听单个(或 多个) 模块 | 可选, 不填时, 所有 module 触发均捕获
    actions: [], // 指定哪些action(方法) 调用时, 触发监听 | 可选, 不填时, 所有 action 触发均捕获
    handler(event: IActionBeforeEvent, next: () => void): void {
        next() // 处理完成后, 需要调用 next 执行下一步操作
    }
})
```

-   注册 action 行为触发后监听

```typescript
import { registerActionAfterEvent, IActionAfterEvent } from '@fsdu/store-plugin-observer'
registerActionAfterEvent({
    modules: [], // 指定监听单个(或 多个) 模块 | 可选, 不填时, 所有 module 触发均捕获
    actions: [], // 指定哪些action(方法) 调用时, 触发监听 | 可选, 不填时, 所有 action 触发均捕获
    handler(event: IActionAfterEvent, next: () => void): void {
        next() // 处理完成后, 需要调用 next 执行下一步操作
    }
})
```

-   注册 $commit 提交拦截器

```typescript
import { registerCommitFilter, ICommitFilterEvent } from '@fsdu/store-plugin-observer'
registerCommitFilter({
    modules: [], // 指定监听单个(或 多个) 模块
    /** 处理方法
     *
     * @param {boolean | IPatchFilterEvent | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     *     - 当 next 参数为 IPatchFilterEvent 时, 将使用 `event` 中参数及值替代原始的commit.
     */
    handler: (
        event: ICommitFilterEvent,
        next: (allowChange: boolean | ICommitFilterEvent | undefined) => void
    ): void | Promise<void> => {
        next() // 允许提交
    }
})
```

-   注册 $patch 提交拦截器

```typescript
import { registerPatchFilter, IPatchFilterEvent } from '@fsdu/store-plugin-observer'
registerPatchFilter({
    modules: [], // 指定监听单个(或 多个) 模块
    /** 处理方法
     *
     * @param {boolean | IPatchFilterEvent | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     *     - 当 next 参数为 IPatchFilterEvent 时, 将使用 `event` 中参数及值替代原始的commit.
     */
    handler: (
        event: IPatchFilterEvent,
        next: (allowChange: boolean | IPatchFilterEvent | undefined) => void
    ): void | Promise<void> => {
        next() // 允许提交
    }
})
```

## 参数/选项

```typescript
export enum EObserverEvent {
    /** action 行为触发前 */
    ON_ACTION_BEFORE = 'onActionBefore',
    /** action 行为触发后 */
    ON_ACTION_AFTER = 'onActionAfter',
    /** $commit 触发前过滤 */
    ON_COMMIT_FILTER = 'onCommitFilter',
    /** $patch 触发前过滤 */
    ON_PATCH_FILTER = 'onPatchFilter'
}

/** store 观察者 参数 */
export interface IStoreObserverOptions {
    /** action 行为调用前触发
     *
     * @param {boolean | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     */
    [EObserverEvent.ON_ACTION_BEFORE]?: (event: IActionBeforeEvent, next: () => void) => void | Promise<void>

    /** action 行为调用后触发 */
    [EObserverEvent.ON_ACTION_AFTER]?: (event: IActionAfaterEvent, next: () => void) => void | Promise<void>

    /** $commit 更新值过滤事件
     *
     * @param {boolean | ICommitFilterEvent | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     *     - 当 next 参数为 ICommitFilterEvent 时, 将使用 `event` 中参数及值替代原始的commit.
     */
    [EObserverEvent.ON_COMMIT_FILTER]?: (
        event: ICommitFilterEvent,
        next: (allowChange: boolean | ICommitFilterEvent | undefined) => void
    ) => void | Promise<void>

    /** $patch 更新值过滤事件
     *
     * @description 由于 $patch 本身是原子性操作. 所以, 针对 $patch 更新的属性, 要不都成功, 要不都失败.
     *
     * @param {boolean | IPatchFilterEvent | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     *     - 当 next 参数为 IPatchFilterEvent 时, 将使用 `event` 中参数及值替代原始的commit.
     */
    [EObserverEvent.ON_PATCH_FILTER]?: (
        event: IPatchFilterEvent,
        next: (allowChange: boolean | IPatchFilterEvent | undefined) => void
    ) => void | Promise<void>
}

/** action 行为调用前触发事件 */
export interface IActionBeforeEvent {
    /** 触发事件的 Module Name */
    readonly module: string
    /** 事件/行为 */
    readonly action: string
    /** 调用参数 */
    params?: IArguments
}

/** action 行为调用后触发事件 */
export interface IActionAfaterEvent {
    /** 触发的 Module Name */
    readonly module: string
    /** 触发的 action */
    readonly action: string
    /** 调用参数 */
    params?: IArguments
    /** 执行结果 */
    res?: any
}

/** $commit 过滤事件
 *
 * @description 本质上来说, 是在模拟装饰器的功能.
 */
export interface ICommitFilterEvent {
    /** 触发的 Module Name */
    readonly module: string
    /** 变更项: key */
    key: string | Array<string>
    /** 变更项: value */
    value: any
}

/** StoreModule state 变更事件 */
export interface IPatchFilterEvent {
    /** 触发的 Module Name */
    readonly module: string
    /** 原始提交项, 未解构 */
    patch: { [key: string]: any }
}

/** 注册 action before 事件参数 */
export interface IRegisterActionBeforeOptions {
    /** 限制 module
     *
     * @description 仅涉及到的module会被捕获
     */
    modules?: string | Array<string>

    /** 限制行为
     *
     * @description 仅涉及到的actions会被捕获, 注意: 与 modules 条件不存在因果关系
     */
    actions?: string | Array<string>

    /** 处理方法 */
    handler: (event: IActionBeforeEvent, next: () => void) => void | Promise<void>
}

/** 注册 action after 事件参数 */
export interface IRegisterActionAfterOptions {
    /** 限制 module
     *
     * @description 仅涉及到的module会被捕获
     */
    modules?: string | Array<string>

    /** 限制行为
     *
     * @description 仅涉及到的actions会被捕获, 注意: 与 modules 条件不存在因果关系
     */
    actions?: string | Array<string>

    /** 处理方法 */
    handler: (event: IActionBeforeEvent, next: () => void) => void | Promise<void>
}

/** 注册 $commit filter 事件参数 */
export interface IRegisterCommitFilterOptions {
    /** 限制 module
     *
     * @description 仅涉及到的module会被捕获
     */
    modules?: string | Array<string>

    /** 处理方法
     *
     * @param {boolean | IPatchFilterEvent | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     *     - 当 next 参数为 IPatchFilterEvent 时, 将使用 `event` 中参数及值替代原始的commit.
     */
    handler: (
        event: ICommitFilterEvent,
        next: (allowChange: boolean | ICommitFilterEvent | undefined) => void
    ) => void | Promise<void>
}

/** 注册 $patch filter 事件参数 */
export interface IRegisterPatchFilterOptions {
    /** 限制 module
     *
     * @description 仅涉及到的module会被捕获
     */
    modules?: string | Array<string>

    /** 处理方法
     *
     * @param {boolean | IPatchFilterEvent | undefined} next 是否允许触发下一过程(更改), 仅当值为 `false` 时, 才会中断值提交操作.
     *     - 当 next 参数为 IPatchFilterEvent 时, 将使用 `event` 中参数及值替代原始的commit.
     */
    handler: (
        event: IPatchFilterEvent,
        next: (allowChange: boolean | IPatchFilterEvent | undefined) => void
    ) => void | Promise<void>
}

export type TRegisterOptions =
    | IRegisterActionBeforeOptions
    | IRegisterActionAfterOptions
    | IRegisterCommitFilterOptions
    | IRegisterPatchFilterOptions
```
