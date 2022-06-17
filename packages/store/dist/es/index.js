/** @fdu/store
 *
 * @author halo951
 * @license MIT
 */
import t from 'set-value'
import { klona as e } from 'klona'
class s {
    __parent__
    storage
    PERSISTENCE_KEYS
    getData
    get parent() {
        return this.__parent__
    }
    get state() {
        return this.getData?.()
    }
    constructor(t) {
        t && (this.storage = t)
    }
    $commit(t, e, s) {
        console.log('$commit', t, e)
    }
    $patch(t, e) {}
    $clear() {}
}
const i = (t, e = {}) => {
        const s = e.separator || '.',
            i = '/' !== s && e.preservePaths
        if ('string' == typeof t && !1 !== i && /\//.test(t)) return t
        t instanceof Array && (t = t.join(s))
        let r = ''
        for (let e = 0; e < t.length; e++) {
            const i = t[e]
            if ('\\' !== i) {
                if (i === s || '[' === i) break
                r += i
            } else r += t[++e]
        }
        return r
    },
    r = (t, e, s) => {
        for (const i of s) if (!e[i]) throw new Error(`${t} ${i} is required.`)
    }
class o {
    options
    ready
    cache = { keys: {}, data: {} }
    get modules() {
        return Object.keys(this).filter((t) => this[t] instanceof s)
    }
    constructor(t) {
        this.options = { version: '1.0.0', ...this.options, ...t }
    }
    install(t) {
        return (
            this.init(),
            t
                ? (this.options.adapter && this.options.adapter.factory(this, t),
                  this.emit((e) => e.onBinded?.(this, t)),
                  this)
                : this
        )
    }
    $clear(t) {
        if (!((t = t ?? this.modules) instanceof Array)) throw new Error('$store.clear() should be passed into Array.')
        let e
        for (const s of t) (e = this[s]), (this.cache.data[s] = e.initData()), this.persistence(s, e)
    }
    init() {
        if (this.ready) return
        let t
        this.emit((t) => t.onBefore?.(this))
        for (const e of this.modules)
            (t = this[e]), r(`$store.${e}`, t, ['initData']), this.injectFactory(e, t), this.prepare(e, t)
        ;(this.ready = !0), this.emit((t) => t.onReady?.(this))
    }
    generateModuleSign(t) {
        return this.emit((t, e, s) => (t.transformSign ? t.transformSign(e, s) : e), t)
    }
    injectFactory(e, s) {
        const r = `$store.${e} `
        ;(s.__parent__ = this),
            (s.getData = () => this.cache.data[e] ?? {}),
            (s.$commit = (o, n, a) => {
                const c = i(o)
                if (!this.cache.keys[e].includes(c)) throw new Error(r + `'${c}' is not defined.`)
                t(this.cache.data[e], o, n, a), this.persistence(e, s)
            }),
            (s.$patch = (o, n) => {
                if (!o) throw new Error(r + "$patch must has 'data'.")
                if ('object' != typeof o || o instanceof Array) throw new Error(r + "$patch's data should is IData.")
                const a = Object.keys(o)
                    .map((t) => i(t))
                    .filter((t) => !this.cache.keys[e].includes(t))
                if (a.length > 0) throw new Error(r + `${JSON.stringify(a)} is not defined.`)
                for (const s in o) t(this.cache.data[e], s, o[s], n)
                this.persistence(e, s)
            }),
            (s.$clear = () => this.$clear([e]))
    }
    prepare(t, e) {
        const s = this.generateModuleSign(t),
            i = e.storage?.getItem(s) ?? null,
            r = e.initData()
        let o = {}
        if (i) {
            const t = JSON.parse(i)
            t?.version === this.options.version &&
                (o = this.emit((t, e, s) => (t.transformPrepare ? t.transformPrepare(e, s) : e), t.data))
        }
        ;(this.cache.keys[t] = Object.keys(r)), (this.cache.data[t] = { ...r, ...o }), this.persistence(t, e)
    }
    persistence(t, e) {
        const s = this.generateModuleSign(t),
            i = this.cache.data[t],
            r = e.storage,
            o = e.PERSISTENCE_KEYS
        let n,
            a = {}
        if (!r || !o) return
        for (const t in i) (n = o.includes(t) && void 0 !== i[t]), n && void 0 !== i[t] && (a[t] = i[t])
        a = this.emit((t, e, s) => (t.transformPersistence ? t.transformPersistence(e, s) : e), a)
        const c = { data: a, version: this.options.version }
        null == a || ('object' == typeof a && 0 === Object.keys(a).length)
            ? r.removeItem(s)
            : r.setItem(s, JSON.stringify(c))
    }
    emit(t, s) {
        let i = e(s)
        if (!(this.options.plugins instanceof Array)) return i
        for (const e of this.options.plugins) i = t(e, i, s)
        return i
    }
}
export { o as StoreManager, s as StoreModule }
