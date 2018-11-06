import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const input = 'src/index.js'
const external = ['@nuware/functions', '@nuware/lenses']

const banner = `/**
 * DOM - ${pkg.description}
 *
 * @version ${pkg.version}
 * @license MIT
 * @copyright Dmitry Dudin <dima@nuware.ru> 2018
 */`

export default [{
  input,
  external,
  output: {
    file: pkg.module,
    format: 'esm',
    banner
  }
}, {
  input,
  external,
  output: {
    file: pkg.main,
    format: 'cjs',
    banner
  }
}, {
  input,
  output: {
    file: pkg.browser,
    format: 'umd',
    name: 'nuware.Emitter',
    banner
  },
  plugins: [
    resolve(),
    commonjs()
  ]
}, {
  input,
  output: {
    file: pkg.minimized,
    format: 'umd',
    name: 'nuware.Emitter'
  },
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ]
}]
