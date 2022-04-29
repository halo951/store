
<template>
    <h3>About</h3>
    <div class="desc">
        user1: {{ store.user1.token }}
        <br />
        user2: {{ store.user2.token }}
    </div>
</template>

<script setup lang="ts">
import { store } from '../store'

</script>

<style lang="less" scoped>
</style>
