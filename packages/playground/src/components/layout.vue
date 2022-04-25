
<template>
    <div class="layout">
        <router-view />
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.layout {
    width: 100%;
    height: 100%;
    border-right: 1px solid #ccc;
    padding: 0;
    display: flex;
    flex-flow: column nowrap;
}
</style>

<style lang="less">
h3 {
    height: 100px;
    margin: 0;
    display: flex;
    align-items: center;
    padding-left: 20px;
    line-height: 2em;

    &::before {
        content: 'Title:';
        padding-right: 5px;
        border-bottom: 5px solid #ddd;
    }
}
</style>