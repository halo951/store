import type { NavbarConfig } from '@vuepress/theme-default'
import pkg from '../../../store/package.json'
import glob from 'glob'

export const navbar: NavbarConfig = [
    { text: '指南', link: '/zh/guide/what' },
    { text: '示例', link: '/zh/example' },
    {
        text: '笔记',
        children: [
            { text: '最佳实践', link: '/zh/notes' },
            { text: 'RoadMap', link: '/zh/roadmap' }
        ]
    },
    {
        text: '链接',
        children: [
            { text: 'NPM', link: 'https://www.npmjs.com/package/@fdsu/store' },
            { text: 'Issue', link: 'https://github.com/halo951/store/issues' },
            { text: `v${pkg.version}`, link: 'https://github.com/halo951/store/CHANGELOG.md' }
        ]
    }
]
