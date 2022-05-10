<template>
    <div class="app">
        <header>@fdsu/store</header>
        <section>
            <Catalog />
            <Layout />
        </section>
    </div>
</template>

<style lang="less">
html,
body {
    margin: 0;
    padding: 0;
    box-sizing: content-box;
}

.app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    header {
        width: calc(100vw - 1em);
        height: 60px;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        padding-left: 1em;
        box-shadow: 0 2px 2px #ccc;
    }

    section {
        width: 100vw;
        height: calc(100vh - 60px - 2px);
        background: rgba(0, 0, 0, 0.025);
        display: flex;
    }
}
</style>
