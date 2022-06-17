# 简介

`@fdu/store` 是一款。

它尽量保持了typescript的各种原生特性, 

 是一个使用 Class API 编程的 Store 工具. 它支持主流的前端应用场景 (vue2.x, vue3.x, react, 小程序). 希望对不同场景下的业务抽象问题, 提供一套通用的解决方案.


他可以被组装到任意一个javascript应用中, 提供一致的基于Store模型编程的开发体验.



## 为什么使用 `@fdu/store`

- 提供了 class api, composition api 两种代码范式的支持.
- 支持**按需持久化**, 允许按模块指定持久化的方式、字段。
- 支持数据源映射
- 支持 时间旅行, 状态快照
- 支持 hmr (需要搭配使用 @fdu/store-composition-api)