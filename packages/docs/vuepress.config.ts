import path from 'path'
import searchPlugin from '@vuepress/plugin-search'

import { defineUserConfig, defaultTheme } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'

import * as zh from './.vuepress/zh'

export default defineUserConfig({
    // website infomation
    lang: 'zh-CN',
    title: 'Flat Design Store Util',
    description: 'Using flat design store to solve the problem of service abstraction. Support vue2.x、vue3.x!',
    head: [
        // 等找个设计的伙计帮忙搞个logo再塞进去吧.
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['meta', { name: 'application-name', content: '@fdsu/store' }],
        ['meta', { name: 'apple-mobile-web-app-title', content: '@fdsu/store' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }]
        // doc search 加速
        // ['link', { rel: 'preconnect', href: 'https://599cec31baffa4868cae4e79f180729b-dsn.algolia.net', crossorigin: true }]
    ],
    // project config
    port: 3333,
    public: 'public/',
    debug: true,
    open: false,
    shouldPrefetch: false,
    locales: {
        '/en/': {
            lang: 'en-us',
            title: 'Flat Design Store Util',
            description: 'Using flat design store to solve the problem of service abstraction. Support vue2.x、vue3.x!'
        },
        '/zh/': {
            lang: 'zh-cn',
            title: 'Flat Design Store Util',
            description: '通过扁平化的Store设计, 解决项目中的服务抽象问题. 支持 Vue2.x, Vue3.x'
        }
    },
    // theme and plugins
    theme: defaultTheme({
        repo: 'halo-951/store',
        docsDir: 'packages/docs',
        lastUpdated: false,
        locales: {
            '/en/': {
                selectLanguageAriaLabel: 'Languages',
                selectLanguageName: 'English'
            },
            '/zh/': {
                selectLanguageText: '语言',
                selectLanguageName: '简体中文',
                backToHome: '返回首页',
                sidebarDepth: 2,
                ...zh
            }
        }
    }),
    plugins: [
        // doc search | docsearch 能力更强大, 但是依赖开源服务. 配置啥的后面再捣鼓.
        searchPlugin({}),
        docsearchPlugin({
            appId: 'R2IYF7ETH7',
            apiKey: '599cec31baffa4868cae4e79f180729b',
            indexName: 'sarch',
            placeholder: '搜索'
        }),
        // 页面Hash锚点插件
        activeHeaderLinksPlugin(),
        // 返回顶部按钮
        backToTopPlugin(),
        // 页面加载进度条
        nprogressPlugin(),
        // 图片缩放能力
        mediumZoomPlugin(),
        // 外联图标
        externalLinkIconPlugin(),

        // 代码高亮提示
        prismjsPlugin({ preloadLanguages: ['typescript', 'markdown'] }),
        // 组件自动注册
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components')
        })
    ]
})
