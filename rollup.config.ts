import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import { ModuleFormat, RollupOptions } from 'rollup'
import path from 'path'

const cwd = process.cwd()
const pkg: any = require(path.join(cwd, 'package.json'))

const banner: string = `
/** ${pkg.name}
 *
 * @author halo951
 * @license MIT
 */`.trim()

/** export rollup.config */
export default async (): Promise<RollupOptions | Array<RollupOptions>> => {
    const formats: Array<ModuleFormat> = ['cjs', 'es']

    /** out to  */
    return formats.map((format: ModuleFormat) => {
        return {
            input: 'src/index.ts',
            plugins: [
                typescript({ clean: true, useTsconfigDeclarationDir: true, abortOnError: true }),
                babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
                resolve({}),
                terser()
            ],
            external: Object.keys(pkg.dependencies),
            output: {
                exports: 'auto',
                inlineDynamicImports: true,
                banner,
                format,
                dir: path.join('dist', format),
                chunkFileNames: (chunk) => chunk.name
            }
        }
    })
}
