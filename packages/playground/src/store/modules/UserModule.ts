import { StoreModule } from '@cp0/store'
import Store from '..'

export interface IUserModel {
    token: string | null
}

export class UserModule extends StoreModule<Store, IUserModel> {
    /** 持久化选项, 指定那些字段需要持久化 */
    PERSISTENCE_KEYS: Array<string> = ['ton']

    initData(): IUserModel {
        return {
            token: '12312211'
        }
    }
    get token() {
        return this.state.token
    }

    login() {
        this.$commit('token', 'xxxx')
    }

    logout() {
        this.$clear()
    }
}
