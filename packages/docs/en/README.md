---
permalink: /
title: Welcome
home: true
heroImage: /logo.png
heroImageDark: /logo-dark.png
pageClass: welcome
actions:
    - text: What is?
      link: /zh/guide
      type: secondary
    - text: Getting Started →
      link: /zh/guide/getting-started.md
      type: primary
---

<div class="tip">My English is not very good, you can refer to <a href='/zh/'>Chinese documents</a></div>

<br />
<hr />
<br />

<div class="tags">
    <section class="tag">
        <h2 class="title">simplify API</h2>
        <div class="content">Very few tool APIs, very low study difficulty!</div>
    </section>
    <section class="tag">
        <h2 class="title">Flat Design</h2>
        <div class="content">Compared with vuex and Pinia, the store designed with this tool reduces the complexity and difficulty of store application maintenance by flattening.</div>
    </section>
    <section class="tag">
        <h2 class="title">Observable</h2>
        <div class="content">Support Vue2.x, Vue3.x。<br /> Allow use the adapter to implement the <b>Observable</b> in other framework.</div>
    </section>
    <section class="tag">
        <h2 class="title">Persistence</h2>
        <div class="content">Integrated persistence feature, support persistence by StoreModule or specify key.! <br /> Allow usage plugin provide 'module sign', 'encrypt' feature.</div>
    </section>
    <section class="tag">
        <h2 class="title">DevTool</h2>
        <div class="content">Usage plugin function, support vue-devtool state snapshot, timeline event.</div>
    </section>
    <section class="tag">
        <h2 class="title">Subscription</h2>
        <div class="content">Usage plugin function, support observer `state change`, `$commit filter`, `action event emit` feature.</div>
    </section>
</div>

<style lang="less">
    
.tip {
    position: absolute;
    left: 50%;
    top: 80px;
    
    font-size: 12px;
    font-family: var(--font-family);
    transform: translateX(-50%);
    background: rgba(0,0,0, 0.8);
    padding: 0.5em 1em;
    color: #ffffff;
    font-weight: 600;
    border-radius: 3px;
    box-shadow: 1px 2px 1px rgba(0,0,0, 0.4);
    user-select: text;
}

.tags {
    width: 100%;
    height: auto;
    margin-bottom: 40px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
    .tag {
        width: calc(33% - 2em);
        height: 180px;
        padding: 0 1em;
        .title {
            text-align: center;
        }
        .content {
            padding: 0 1em;
        }
    }
}
</style>
