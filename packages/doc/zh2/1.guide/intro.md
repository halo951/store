# 简介

`@fdu/store` (flat design store util) 是一款通过 Class API 范式提供能力的 Store 工具, 用于改善 `vuex`(Option API) 在 typescript 中的开发体验和学习复杂度创建的。专注解决如下问题:

-   `组件间复杂的参数传递过程`
-   `全局状态(属性)管理` (如: token)
-   `复杂业务抽象` (如: 支付业务)
-   `持久化数据维护和版本化管理`

:::TIP

`@fdu/store` 是基于`vuex`,`pinia`的设计理念, 重新设计的一套 Store 工具, 而不是对 `vuex` 的封装。不同于`vuex`, `pinia`这类专门为 vue 定制的 Store 工具, `@fdu/store` 允许通过[适配器](/zh/adapter), 将 Store 层应用到任意一个前端应用中.

:::

## 哪些场景更适合使用`@fdu/store`?

当项目中存在如下问题, 可通过 `fdu/store`解决.

-   项目中,
-   在使用装饰器模式(vue-property-decorator)维护的 vue 应用
