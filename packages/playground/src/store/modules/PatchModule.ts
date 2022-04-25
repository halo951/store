import { StoreModule } from '@cp0/store'
import Store from '..'

export interface IPatchModel {
    a: string
    b: number
    c: Array<string>
    d: any
}

export class PatchModule extends StoreModule<Store, IPatchModel> {
    initData(): IPatchModel {
        return {
            a: 'a',
            b: 1,
            c: [],
            d: {
                f: [1, 2, 3],
                h: { a: 1, b: 2 }
            }
        }
    }

    /** patch many change */
    basic() {
        // basic
        this.$patch({
            a: 'aa',
            b: 123,
            c: [1, 2, 3, 4]
        })
    }

    byObjectPath() {
        // allow
        this.$patch({
            'd.h.a': 2, // changed d.h => {a:2, b:2}
            'd.f.2': 3 // changed d.f => [1, 3, 3]
        })
    }

    patchFailure() {
        try {
            this.$patch({
                n: 123 // in this module, n is not defined
            })
        } catch (error) {
            console.log('see error:', (error as Error).message)
        }
    }
}
