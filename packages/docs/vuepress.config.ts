import { defineUserConfig, defaultTheme } from 'vuepress'
import docsearchPlugin from '@vuepress/plugin-docsearch'
import tocPlugin from '@vuepress/plugin-toc'
import prismjsPlugin from '@vuepress/plugin-prismjs'

export default defineUserConfig({
    // website infomation
    lang: 'zh-CN',
    title: 'flat design store',
    description: 'Using flat design store to solve the problem of service abstraction. Support vue2.x、vue3.x!',
    head: [
        // 等找个设计的伙计帮忙搞个logo再塞进去吧.
        // ['link', { rel: 'icon', href: '/images/logo.png' }],
        // search 加速
        // ['link', { rel: 'preconnect', href: 'https://599cec31baffa4868cae4e79f180729b-dsn.algolia.net', crossorigin: true }]
    ],
    // project config
    port: 8090,
    public: '/public',
    debug: true,
    open: false,
    shouldPrefetch: false,

    // theme and plugins
    theme: defaultTheme,
    plugins: [
        docsearchPlugin({
            appId: 'R2IYF7ETH7',
            apiKey: '599cec31baffa4868cae4e79f180729b',
            indexName: 'sarch',
            translations: [],
            placeholder: '搜索'
        }),
        tocPlugin({}),
        // 代码高亮提示
        prismjsPlugin({ preloadLanguages: ['typescript', 'markdown'] })
    ]
})
