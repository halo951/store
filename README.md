# @fdu/store

![npm](https://img.shields.io/npm/dw/@fdu/store.svg)
[![GitHub stars](https://img.shields.io/github/stars/halo951/store.svg?style=social&label=@fdu/store)](https://github.com/halo951/store)
[![npm version](https://badge.fury.io/js/@fdu/store.svg)](https://badge.fury.io/js/@fdu/store)

> 通过扁平化设计的store解决服务抽象和全局状态管理问题.
>
> flat design store util, using flat design store to solve the problem of service abstraction and global state mananger.

** Docs: [http://store.cp0.team](http://store.cp0.team)**

## Design

- (class api) 面向类编程的API设计
- (flat) 扁平化
- (plug-in) 插件化
- (customized persistence) 可定制的持久化

## Core
    
`@fdu/store` 设计方面采用 **mananger - module** 模式. 原意是借助typescript类型推断及EsNext的getter/setter语法特性, 降低引入`Store`的上手难度. 核心能力包含: `State Manager`, `Persistence`, `Adapter`, `Plug-in` 4个部分.

## Support

- **适配器**

    - (@fdu/store-adapter-vue2) 提供 vue2.x 响应式支持.
    - (@fdu/store-adapter-vue3) 提供 vue3.x 响应式支持.
    - (@fdu/store-adapter-react) 开发中, react 响应式支持.

- **插件**   
    - (@fdu/store-plugin-devtool): 提供 vue-devtool 支持, 支持状态快照, 时间旅行.
    - (@fdu/store-plugin-encrypt): 提供持久化数据加/解密支持
    - (@fdu/store-plugin-observer): 提供 composition api 方式的观察者模式支持  
    - (@fdu/store-plugin-sign): 提供 Store 命名空间能力, 解决持久化字段冲突问题
    - (@fdu/store-plugin-datasource): 提供自定义数据源接口, 用于orm状态数据映射. (未验证)

- **学习**: 了解 EsNext特性, 及 ts class 即可上手.




文笔有限, 欢迎补充...

## Adapters

> 通过适配器, 手工指定不同渲染框架的响应式实现方案.

-   [@fdu/store-adapter-vue2](https://www.npmjs.com/package/@fdu/store-adapter-vue2) | vue2.x 支持
-   [@fdu/store-adapter-vue3](https://www.npmjs.com/package/@fdu/store-adapter-vue3) | vue3.x 支持
-   `@fdu/store-adapter-react` | 开发中, 目前卡在`subscription`实现上.

## Plugins

-   [@fdu/store-plugin-encrypt](https://www.npmjs.com/package/@fdu/store-plugin-encrypt) | 提供持久化数据加密能力
-   [@fdu/store-plugin-module-sign](https://www.npmjs.com/package/@fdu/store-plugin-module-sign) | 提供持久化数据命名空间能力, 解决多`Store`情况下, 持久化数据写入冲突问题.
-   [@fdu/store-plugin-datasource](https://www.npmjs.com/package/@fdu/store-plugin-datasource) | 提供自定义 Store 数据源能力
-   [@fdu/store-plugin-devtool](https://www.npmjs.com/package/@fdu/store-plugin-devtool) | 提供 vue-devtool 支持
-   [@fdu/store-plugin-observer](https://www.npmjs.com/package/@fdu/store-plugin-observer) | 观察者模式, 支持`composition api`
-   [@fdu/store-plugin-vite-hmr](https://www.npmjs.com/package/@fdu/store-plugin-vite-hmr) | 提供 vite hot reload 支持

## FAQ

#### Q. @fdu/store 的灵感来源, 及替代vuex的原因?
    
开始时, 因为在项目中遇到服务解耦的问题, 希望通过应用分层方式解决代码管理问题. 原定是准备引入vuex, 但是看过vuex后, 从个人感觉上, 存在几个问题影响使用体验. 

- `vuex` 是面向 Object API编程的, 最新的 `pinia` 也是如此. 而我的项目采用的是`vue-property-decorator`插件的面向class api编程.
- `vuex` 中不必要的 `getters`和 `mutations`. 在es6+规范中, 已经提供了getter/setter语句, 如果从提供保护属性读写的角度来看,getter/setter已经可以满足需要, 引入更多的API必然增加学习成本。 当然, 针对state数据源的保护是另外一方面的问题，也可能vuex是考虑更小的环境依赖问题.
- `vuex` 的 `dispatch` api, 也可以diss一下, 虽然目前绝大多数Store工具都采用dispatch来处理action调用问题(包括: vuex, pinia, redux 等). 但是, 从实践的角度考虑, 前端项目大多数不存在如后端服务注入的概念, 一般情况下, 中小型包括一些略大的项目, 对于action的行为, 仍然聚焦在某个实体下的操作行为. 这种情况, 完全可以采用直接式的api调用(`module.action(...)`), 而针对dispatch的调用拦截则可以通过 `Proxy` 或者 `装饰器` 来满足方法的前置/后置处理. 这样的action调用与观察也会更加自由.
- 本质来说, `vuex` 提供的是另外一组tree node模型. 用来将数据状态从视图中进行分离, 希望将全局的数据维护在一个地方. 所以, vuex提供了`namespace`和`module`的概念. 但大多数场景见到的还是对于业务或者全局状态的拆分.

因为上述这些原因, 有了`@fdu/store`。

#### Q. 可定制的持久化是什么?

在未集成orm工具的前端项目中, 持久化往往是一个Store最重要的组成部分之一. 持久化存在2个核心的问题, **运行环境复杂度**与**持久化数据的管理问题**. 在`@fdu/store`中, 默认将持久化能力作为一项基础能力集成在核心代码内, 目的就是为了解决上述的2个问题。即**允许module指定Storage, 指定哪些state字段持久化**.  
    
- **运行环境复杂度**: 前端项目运行环境多样(小程序, hybrid app, nodejs), 不同场景下存在一些环境问题。如: 客户端禁用了localStorage, 多webview场景持久化数据不同步, Storage API 不一致问题.
- **持久化数据的管理问题**: 也许你会遇到这么一种场景, 只想讲同一module下的某个属性持久化, 而不想整个module持久化. 但由于工具限制, 只能被迫拆分为2个Module解决持久化问题, 或者需要增加额外的filter来维护哪些数据持久化. 增加了一些冗余代码.




## Road Map

-   **@fdu/store-adapter-react** react 响应式适配器开发中. 目前卡在`subscription`实现上.


