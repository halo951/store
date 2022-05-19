import { StoreModule, Options, IData } from '@fdsu/store'
import type { Store } from '..'

interface ITestModel {
    a: string | null
    b: number | null
    c: boolean | null
    d: Array<any> | null
    e: { [key: string]: any } | null
    f: null
    // 特殊的 key 值
    'a.b': string | null
}

export class TestModule extends StoreModule<ITestModel, Store> {
    /** 定义数据模型 */
    initData(): ITestModel {
        return {
            a: 'a',
            b: 0,
            c: false,
            d: [1, 2, 3],
            e: {},
            f: null,
            'a.b': ''
        }
    }

    /** getter/setter */
    get a(): string | null {
        return this.state.a
    }
    get b(): number | null {
        return this.state.b
    }
    get c(): boolean | null {
        return this.state.c
    }
    get d(): Array<any> | null {
        return this.state.d
    }
    get e(): any {
        return this.state.e
    }
    get f(): null {
        return this.state.f
    }

    /** mapping to publich function */
    commit(key: Array<string | number> | string, value: any, options?: Options) {
        this.$commit(key, value, options)
    }

    /** mapping to publich function */
    patch(data: IData, options?: Options) {
        this.$patch(data, options)
    }

    getA(): string {
        return this.state.a as string
    }

    setA(str: string): void {
        this.$commit('a', str)
    }
}
