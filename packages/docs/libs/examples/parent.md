# scene - 服务组合

当我们服务解耦以后, 会碰到在 A 模块中 需要使用到 B 模块数据的场景. 或者当 A 状态发生变更后, 需要修改 B 的场景. 可以参考如下解决方案

### 1. 通过 .parent 互操作

1.  使用其他 module 数据
2.  向其他 module, 写入新状态

```typescript
export interface IAppModel {
    version: string
}
export interface IUserModel {
    token: string
}
export class AppModule extends StoreModule<Store, IAppModel> {
    initData() {
        return { version: '1.0.0' }
    }
    get version(): string {
        return this.state.version
    }

    set version(val: string) {
        this.$commit('version', val)
    }
}
export class UserModule extends StoreModule<Store, IUserModel> {
    initData() {
        return { token: null }
    }

    async upgrade() {
        const res = await request.post('/upgrade', {
            // 1. 借助 parent 获取其他module的状态
            version: this.parent.app.version
        })
        const { version } = res.data
        // 2. 需要通过其他module暴露的public的属性/方法修改其他模块状态
        this.parent.app.version = version
        return version
    }
}

export class Store extends StoreManager {
    app: AppModule = new AppModule()
    user: UserModule = new UserModule()
}
```

### 2. 借助 observer 工具, 注册状态变化事件

```typescript
import { StoreObserverPlugin } from '@fdsu/store-plugin-observer'
export const store = new Store({
    plugins: [
        // 注: 也可以在构造函数这里, 注册全局事件, 但影响代码美观, 建议还是通过
        // composition api 方式注册事件.
        new StoreObserverPlugin()
    ]
})
// 监听状态变化
watchStateChange({
    modules: 'app',
    path: 'version',
    handler: (state): void => {}
})

// 监听方法被调用(调用结束触发)
registerActionAfterEvent({
    modules: 'user',
    actions: 'upgrade',
    handler: (event, next): void => {
        console.log(event)
        next() // 必须要触发next哦!
    }
})
```
