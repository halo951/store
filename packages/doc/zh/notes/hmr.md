# 关于 HMR

首先, hmr 的功能暂时没有实现. 原因是, 整个 Store 被打造成了一个原子级别的单位. 没法拆解.

试验代码如下:

```typescript
export interface ITestModel {}
export class TestModule extends StoreModule<Store, ITestModel> {
    initData() {}
}

export class Store extends StoreManager {
    test: TestModule = new TestModule()
}
export const store = new Store()
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(store))
}
```

我在 `vite` 上进行试验, `import.meta.hot.appect`

## 目前碰到的几个困难点

1. `this` 指向问题

## 破局思路

1. 全量替换整个 Store, 方案如下:
    1. 当改变 initData 时,
