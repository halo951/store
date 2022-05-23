# 安装

> 推荐使用 **[Yarn](https://yarnpkg.com/getting-started/install)**

`@fdu/store` 提供 **cjs**、 **es** 两种模式导入, 在 ts 项目中使用才能发挥出工具的最佳效果!

-   安装 `@fdu/store`

<CodeGroup>
  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn add @fdu/store
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install @fdu/store
```

  </CodeGroupItem>
</CodeGroup>

-   根据不同的项目框架(版本), 选择合适的适配器

<CodeGroup>
  <CodeGroupItem title="Vue2.x">

```bash:no-line-numbers
yarn add @fdu/store-adapter-vue2
```

  </CodeGroupItem>

  <CodeGroupItem title="Vue3.x" active>

```bash:no-line-numbers
yarn add @fdu/store-adapter-vue3
```

  </CodeGroupItem>
  <CodeGroupItem title="React" active>

```:no-line-numbers
TODO - 正在试验subscription工具的实现方式, 会在近期更新.
```

  </CodeGroupItem>
</CodeGroup>
