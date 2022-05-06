import { SidebarConfig, SidebarConfigArray, SidebarGroupCollapsible, SidebarItem } from 'vuepress'

/** export default sidebar
 *
 * @description 基于2级目录映射
 */
export const sidebar: SidebarConfig = {
    '/zh/': [{ text: '介绍' }],
    '/zh/notes': [{ text: '开发笔记' }]
}

// [
//     {
//         text: '介绍',
//         collapsible: true,
//         ""
//         children: [
//             { text: '@fdsu/store 是什么?', link: 'guide\\intro\\what' },
//             { text: '安装', link: 'guide\\intro\\install' },
//             { text: '新手入门', link: 'guide\\intro\\getting-started' },
//             { text: '与 Vuex/Pinia 对比', link: 'guide\\intro\\diff' },
//             { text: '架构设计', link: 'guide\\intro\\framework' }
//         ]
//     },
//     {
//         text: '核心概念',
//         children: [
//             {
//                 text: 'Store',
//                 link: 'guide\\core\\README'
//             },
//             {
//                 text: 'StoreManager',
//                 link: 'guide\\core\\manager',
//                 children: []
//             },
//             {
//                 text: 'StoreModule',
//                 link: 'guide\\core\\module'
//             }
//         ]
//     },
//     {
//         text: '进阶',
//         children: [
//             {
//                 text: '扁平化设计',
//                 link: 'guide\\advanced\\flat design'
//             },
//             {
//                 text: '响应式设计',
//                 link: 'guide\\advanced\\flat design'
//             },
//             {
//                 text: '插件化',
//                 link: 'guide\\advanced\\primordial'
//             },
//             {
//                 text: '利用TS特性优化代码',
//                 link: 'guide\\advanced\\traces'
//             }
//         ]
//     },
//     {
//         text: 'plugins',
//         children: [
//             {
//                 text: 'store-plugin-datasource',
//                 link: 'guide\\plugins\\store-plugin-datasource'
//             },
//             {
//                 text: 'store-plugin-devtool',
//                 link: 'guide\\plugins\\store-plugin-devtool'
//             },
//             {
//                 text: 'store-plugin-encrypt',
//                 link: 'guide\\plugins\\store-plugin-encrypt'
//             },
//             {
//                 text: 'store-plugin-module-sign',
//                 link: 'guide\\plugins\\store-plugin-module-sign'
//             },
//             {
//                 text: 'store-plugin-observer',
//                 link: 'guide\\plugins\\store-plugin-observer'
//             }
//         ]
//     }
// ]
