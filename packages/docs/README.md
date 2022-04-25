# @cp0/docs

> `@cp0/store` 说明文档

```
|- 描述 introduction
  |- @cp0/store 是什么?
  |- 最精简的API设计
|- Usage
  |- install | 安装
  |- Getting Started | 入门
  |- Store Path
|- Core | 核心概念
  |- State | 状态/数据源
  |- Getter/Setter | 对外暴露的数据读写操作.
  |-
  |- StoreManager
  |- StoreModule
    |-
  |- State | 状态/数据源
  |- Getter/Setter | 读/写保护
  |- Actions | 行为
  |- State Persistence | 状态持久化
  |- StoreManager | 状态管理
  |- StoreModule Command | 操作
    |- $commit 提交变更
    |- $patch 批量提交
    |-
|- Plugins | 插件集合
  |- Listen | 提供 commit / action 监听支持
  |- Devtool | vue-devtool 支持
  |- Datasource | 自定义数据源
  |- Encrypt | 持久化数据加密
  |- ViteHmr | 提供vite hotreload 支持

```

1. 使用 ts-doc 生成 apis
