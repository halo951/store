import { SidebarConfig } from 'vuepress'

/** export default sidebar
 *
 * @description 基于2级目录映射
 */
export const sidebar: SidebarConfig = {
    '/zh/': [
        {
            text: '指南',
            children: [
                '/zh/guide/what',
                '/zh/guide/install',
                '/zh/guide/getting-started',
                '/zh/guide/framework',
                '/zh/guide/diff'
            ]
        },
        {
            text: '核心概念',
            collapsible: true,
            children: ['/zh/core/manager', '/zh/core/module', '/zh/core/adapter']
        },
        {
            text: '插件',
            collapsible: true,
            children: [
                '/zh/plugins/store-plugin-devtool',
                '/zh/plugins/store-plugin-encrypt',
                '/zh/plugins/store-plugin-module-sign',
                '/zh/plugins/store-plugin-datasource',
                '/zh/plugins/store-plugin-observer'
            ]
        }
    ],
    '/zh/example': [],
    '/zh/notes': [{ text: '开发笔记', children: ['ad'] }]
}
