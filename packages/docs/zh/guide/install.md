# 安装

在项目中 `@fdsu/store` 一般由 `Store`, `Adapter(适配器)`, `Plugin(插件)` 三部分组成。 其中, `Adapter` 提供不同框架下的响应式支持, `Plugin` 提供 Store 能力扩展。

## 安装核心依赖

```bash

yarn add @fdsu/store

```

## 选择适配器

根据项目使用框架选择, 已提供 `vue2.x`, `vue3.x` 适配器. 其他框架, 可遵循 `Adapter` 接口, 另行实现响应式数据.

```bash

# vue3.x
yarn add @fdsu/store-adapter-vue3

# vue2.x
yarn add @fdsu/store-adapter-vue2


# react | todo 开发中

```

## 选择插件

目前, 提供有如下插件

-   [store-plugin-datasource](/zh/plugins/store-plugin-datasource) : 自定义数据源
-   [store-plugin-devtool](/zh/plugins/store-plugin-devtool) : vue devTool 工具支持 (状态快照, 时间旅行)
-   [store-plugin-encrypt](/zh/plugins/store-plugin-encrypt) : 持久化数据加密
-   [store-plugin-module-sign](/zh/plugins/store-plugin-module-sign) : 自定义模块签名 (用于同一站点下, 多 Store 场景)
-   [store-plugin-observer](/zh/plugins/store-plugin-observer) : 观察者模式 (提供 Composition API 方式的 store 事件监听器)
