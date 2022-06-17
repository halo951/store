# 对比

比较的对象, 选择的是 `vuex`, `pinia`。下面, 将会从几个方面对比 API 的差异以及设计思想的差异.

-   编程范式
-   API 差异
-   适用场景
-   扩展性

## 编程范式

首先, 是编程范式方面。`vuex4.x` 及 `pinia` 引入了`Composition API` 概念, 但是在 Store 的定义上, 仍然采用的是`Option API`定义, 不够直观。

接下来, 我们从以下

-   编程方式: `vuex` 采用 Options API, `@fdu/store` 采用 Class API.
-   API 方面, 借助 es 特性
    -   setter: 即 es 特性`set value(val)`. 等同于`vuex`的**Muntations**
    -   getter: 即 es 特性`get value()`. 等同于``
