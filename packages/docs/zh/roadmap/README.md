---
title: RoadMap
lang: zh-CN
children:
    - name: 1
sidebar: auto
---

## New Feature

| Date    | Feature                                          | Status |
| :------ | ------------------------------------------------ | ------ |
| 2022.05 | 实现 Vite HMR 能力                               | 废弃   |
| -       | 实现 React subscription, 完成 React Adapter 开发 | 进行中 |

## Notes

-   **@fdsu/store-adapter-react**

    -   状态: 进行中
    -   react 集成已经验证过可行。目前, 主要因为 subscription 能力还没有实现, 所以导致 react 的 adapter 还没搞出来.

-   **开发 Vite HMR 插件**
    -   状态: 废弃
    -   尝试过两种情况, 在`Store`中, 挂载导出的 Store 对象, 或使用 accept 订阅`StoreModule`.
    -   实现:
        -   通过 demo 验证, 倒是实现了通过 accept 订阅 Store 对象 HMR, 或在 Module 文件中, 订阅 Module, 来指定 Module 重载.
        -   实现的效果是, 保留`Store.cache`的同时, 重新实例化当前`Store`下的`StoreModule`.
    -   影响因素:
        -   无法确定指定 HMR 的对象的原子级别. 不确定, 哪些需要更新
    -   具体表现
        -   因为是弱约束的关系, 在`StoreModule`中, 在 `initData()`之外, 定义了其他变量. 无法被更新.
        -   或者在`StoreModule`中, 出现定义`setInterval`等异步函数的情况, 无法控制.
        -   同时, 更新后的`Store`在 视图组件中调用的表现, 也有些诡异.
