# scene - 用户登录态管理

目前, 大多数前端项目的登录态, 主要通过在**Cookie**或者**Request Header**中携带 token 或者其他登录标识实现. 其中, Cookie 方式存储的登录态, 主要由后端维护。这里主要演示下, 基于 Header 的登录态维护方式.

## 示例

### 目录

> 对于请求工具的定义, 根据项目习惯决定, 不要完全照搬哦!

```
.
|- main.ts
|- /utils
    |- CreateRequest.ts
|- /store
    |- index.ts
    |- /modules
        |- UserModule.ts
        |- ...
```

### Code

-   UserModule.ts

```typescript
export interface IUserModel {
    /** 登录态凭证 */
    token: string | null
    /** 用户信息 */
    user: any
}
/** 定义User信息相关的 module */
export class UserModule extends StoreModule<IUserModel> {
    // 将 token 持久化, 下次免登录
    PERSISTENCE_KEYS: Array<string> = ['token']

    initData(): IUserModel {
        return {
            token: null,
            user: null
        }
    }

    /** 登录凭证 */
    get token(): string {
        return this.state.token
    }

    /** 用户信息
     *
     * @description 提供给视图层使用, 如果用户信息跟登录接口是异步操作时, 则建议通过下面的 getUser() 方法获取用户信息
     *
     * @use store.user.userInfo
     */
    get userInfo(): any {
        return this.state.user
    }

    /** 登录 */
    async login(): Promise<void> {
        const res = await apis.login() // 请求调用
        const { token, user } = res.data
        this.$patch({ token, user })
    }

    /** 登出 */
    async logout(): Promise<void> {
        this.$clear() // 清除数据
    }

    /** 获取用户信息 (简单的LazyLoad)
     *
     * @param {boolean} forceUpdate 强制刷新用户数据
     */
    async getUser(forceUpdate?: boolean): Promise<any> {
        if (this.state.user && !forceUpdate) return this.state.user
        const res = await apis.getUser()
        const { user } = res.data
        this.$patch({ user })
        return user
    }
}
```

-   Store.ts

```typescript
import { StoreManager } from '@fdu/store'
import { UserModule } from './modules/UserModule'

export class Store extends StoreManager {
    // 登录态, 建议通过localStorage存储
    user: UserModule = new UserModule(localStorage)
}
export const store: Store = new Store()
```

-   Main.ts

```typescript
import { createApp } from 'vue'
import { store } from './store'
const app = createApp()
app.use(store)
```

-   CreateRequest.ts

> 以 axios 举例, 建议根据实际场景调整.

```typescript
import axios, { AxiosRequestTransformer } from 'axios'

const request = axios.create({})

const tr: Array<AxiosRequestTransformer> = request.defaults.transformRequest
tr.push((data, headers) => {
    headers['token'] = store.user.token
    return data
})
// 另外, 附加登录态失效等处理方法即可.
```
