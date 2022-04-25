import path from 'path-browserify'
import {
    createRouter,
    Router,
    createWebHistory,
    RouteRecordRaw,
    RouteLocationNormalized,
    NavigationFailure
} from 'vue-router'

const views: Record<string, { [key: string]: any }> = import.meta.globEager('../views/*.vue')

const routes: Array<RouteRecordRaw> = Object.keys(views).map((op: string) => {
    const name = path.basename(op, '.vue')
    return {
        name,
        path: '/' + name,
        component: views[op].default
    }
})
routes.push({
    name: 'index-alias',
    path: '/',
    redirect: '/index'
})

export const router: Router = createRouter({
    history: createWebHistory('/'),
    routes
})

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized, failure?: NavigationFailure | void) => {
    console.log('to:', to)
    return to
})
