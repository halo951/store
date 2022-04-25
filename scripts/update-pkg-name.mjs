import { readFileSync, writeFileSync } from 'fs'
import glob from 'glob'
import path from 'path'
import { format } from './format.mjs'

class Main {
    /** update all [store, store-plugin-8] */
    async setup() {
        const projects = glob.sync('packages/store*/', { absolute: true })
        let p, fi
        for (let cwd of projects) {
            p = path.join(cwd, 'package.json')
            const pkg = JSON.parse(readFileSync(p, { encoding: 'utf-8' }))
            pkg.name = `@cp0/${path.basename(cwd)}`
            fi = format(JSON.stringify(pkg), { parser: 'json-stringify' })
            writeFileSync(p, fi, { encoding: 'utf-8' })
        }
    }
}

new Main().setup()
