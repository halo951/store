<template>
    <h3>About</h3>
    <div class="desc">
        user1: {{ store.user1.token }}
        <br />
    </div>
</template>

<script setup lang="ts">
import { store } from '../store'

store.user1.login()
</script>

<style lang="less" scoped></style>
