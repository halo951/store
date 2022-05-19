import { StoreModule } from '@fdsu/store'

export interface ITestModel {
    a: string | null
    b: Array<any> | null
    c: { [key: string]: any } | null
}

export class TestModule extends StoreModule<ITestModel> {
    protected initData(): ITestModel {
        return {
            a: null,
            b: [],
            c: { n: '123' }
        }
    }
    get a(): string | null {
        return this.state.a
    }

    set a(a: string) {
        this.$commit('a', a)
    }

    get b(): Array<any> | null {
        return this.state.b
    }

    set b(b: Array<any> | null) {
        this.$commit('b', b)
    }

    get c(): { [key: string]: any } | null {
        return this.state.c
    }

    set c(c: { [key: string]: any }) {
        this.$commit('c', c)
    }

    push(val: number) {
        this.$commit(`b.${this.b.length}`, val)
    }

    set(key: string, val: any) {
        this.$commit(`c.${key}`, val)
    }
}
