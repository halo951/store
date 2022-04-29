import glob from 'glob'
import rimraf from 'rimraf'
import child_process from 'child_process'
import path from 'path'

class Main {
    /** build all packages */
    async setup() {
        let projects = glob.sync('./packages/store*/', { absolute: true }).sort()
        this.build(projects, null)
    }
    build(projects, appoint) {
        let range = appoint || '*'
        rimraf.sync(`packages/${range}/dist/`)
        rimraf.sync(`packages/${range}/typings/`)
        for (let cwd of projects) {
            console.log('> build: ', path.basename(cwd))
            try {
                child_process.execSync('yarn build', { cwd })
            } catch (error) {
                console.log('erro: build failure', path.basename(cwd))
            }
        }
    }
}

new Main().setup()
