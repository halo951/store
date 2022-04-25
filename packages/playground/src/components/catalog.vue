
<template>
    <div class="catalog">
        <ul class="list">
            <li v-for="(route) of routes" :key="route" :class="['item', isActive(route) ? 'active' : '']"
                @click="to(route)">
                > {{ route }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import path from 'path-browserify'
import { router } from '../router';
const views = import.meta.globEager("../views/*.vue")

const routes = ref(Object.keys(views).map(op => path.basename(op, '.vue')))

const isActive = ref((route: string) => {
    return router.currentRoute.value.path === '/' + route
})
const to = (route: string) => router.push('/' + route)
</script>

<style lang="less" scoped>
.catalog {
    width: 240px;
    height: 100%;
    border-right: 1px solid #ccc;
    background: #fff;
    flex-shrink: 0;
    flex-grow: 0;

    .list {
        padding: 0;

        .item {
            width: calc(100% - 2em);
            height: 40px;
            display: flex;
            align-items: center;
            padding-left: 1em;
            margin-left: 1em;

            &.active {
                background: #ccc;
            }
        }
    }
}
</style>
