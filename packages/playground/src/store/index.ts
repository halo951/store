import { StoreManager } from '@cp0/store'
import { UserModule } from './modules/UserModule'

export default class Store extends StoreManager {
    user: UserModule
}
