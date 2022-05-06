import { StoreModule } from '@fdsu/store'
import Store from '..'

export interface IUserModel {
    token: string | null
}

export class UserModule extends StoreModule<Store, IUserModel> {
    static $id: string = 'haha'
    /** 持久化选项, 指定那些字段需要持久化 */
    PERSISTENCE_KEYS: Array<string> = ['ton']
    constructor() {
        super()
        console.log('new 1User')
    }
    initData(): IUserModel {
        return {
            token: '1211123112'
        }
    }

    get token() {
        return 'token1233322112 | ' + this.state.token
    }

    login() {
        this.abc()
    }

    logout() {
        this.$clear()
    }

    abc() {
        console.log('abc')
    }
}
