/** @fdu/store
 *
 * @author halo951
 * @license MIT
 */
'use strict'
Object.defineProperty(exports, '__esModule', { value: !0 })
var t = require('set-value'),
    e = require('klona')
function s(t) {
    return t && 'object' == typeof t && 'default' in t ? t : { default: t }
}
var r = s(t)
class i {
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
const o = (t, e = {}) => {
        const s = e.separator || '.',
            r = '/' !== s && e.preservePaths
        if ('string' == typeof t && !1 !== r && /\//.test(t)) return t
        t instanceof Array && (t = t.join(s))
        let i = ''
        for (let e = 0; e < t.length; e++) {
            const r = t[e]
            if ('\\' !== r) {
                if (r === s || '[' === r) break
                i += r
            } else i += t[++e]
        }
        return i
    },
    n = (t, e, s) => {
        for (const r of s) if (!e[r]) throw new Error(`${t} ${r} is required.`)
    }
;(exports.StoreManager = class {
    options
    ready
    cache = { keys: {}, data: {} }
    get modules() {
        return Object.keys(this).filter((t) => this[t] instanceof i)
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
            (t = this[e]), n(`$store.${e}`, t, ['initData']), this.injectFactory(e, t), this.prepare(e, t)
        ;(this.ready = !0), this.emit((t) => t.onReady?.(this))
    }
    generateModuleSign(t) {
        return this.emit((t, e, s) => (t.transformSign ? t.transformSign(e, s) : e), t)
    }
    injectFactory(t, e) {
        const s = `$store.${t} `
        ;(e.__parent__ = this),
            (e.getData = () => this.cache.data[t] ?? {}),
            (e.$commit = (i, n, a) => {
                const c = o(i)
                if (!this.cache.keys[t].includes(c)) throw new Error(s + `'${c}' is not defined.`)
                r.default(this.cache.data[t], i, n, a), this.persistence(t, e)
            }),
            (e.$patch = (i, n) => {
                if (!i) throw new Error(s + "$patch must has 'data'.")
                if ('object' != typeof i || i instanceof Array) throw new Error(s + "$patch's data should is IData.")
                const a = Object.keys(i)
                    .map((t) => o(t))
                    .filter((e) => !this.cache.keys[t].includes(e))
                if (a.length > 0) throw new Error(s + `${JSON.stringify(a)} is not defined.`)
                for (const e in i) r.default(this.cache.data[t], e, i[e], n)
                this.persistence(t, e)
            }),
            (e.$clear = () => this.$clear([t]))
    }
    prepare(t, e) {
        const s = this.generateModuleSign(t),
            r = e.storage?.getItem(s) ?? null,
            i = e.initData()
        let o = {}
        if (r) {
            const t = JSON.parse(r)
            t?.version === this.options.version &&
                (o = this.emit((t, e, s) => (t.transformPrepare ? t.transformPrepare(e, s) : e), t.data))
        }
        ;(this.cache.keys[t] = Object.keys(i)), (this.cache.data[t] = { ...i, ...o }), this.persistence(t, e)
    }
    persistence(t, e) {
        const s = this.generateModuleSign(t),
            r = this.cache.data[t],
            i = e.storage,
            o = e.PERSISTENCE_KEYS
        let n,
            a = {}
        if (!i || !o) return
        for (const t in r) (n = o.includes(t) && void 0 !== r[t]), n && void 0 !== r[t] && (a[t] = r[t])
        a = this.emit((t, e, s) => (t.transformPersistence ? t.transformPersistence(e, s) : e), a)
        const c = { data: a, version: this.options.version }
        null == a || ('object' == typeof a && 0 === Object.keys(a).length)
            ? i.removeItem(s)
            : i.setItem(s, JSON.stringify(c))
    }
    emit(t, s) {
        let r = e.klona(s)
        if (!(this.options.plugins instanceof Array)) return r
        for (const e of this.options.plugins) r = t(e, r, s)
        return r
    }
}),
    (exports.StoreModule = i)
