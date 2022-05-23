import { StoreModule } from '@fdu/store'
export interface IUserModel {
    token: string | null
}

export class User2Module extends StoreModule<IUserModel> {
    static $id: string = 'User2'

    /** 持久化选项, 指定那些字段需要持久化 */
    PERSISTENCE_KEYS: Array<string> = ['ton']

    initData(): IUserModel {
        return {
            token: '123222'
        }
    }
    get token() {
        return this.state.token
    }

    login() {}

    logout() {
        this.$clear()
    }
}
