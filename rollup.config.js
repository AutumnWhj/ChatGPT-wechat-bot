import pkg from './package.json'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import externals from 'rollup-plugin-node-externals'
import typescript from '@rollup/plugin-typescript'

const footer = `
if(typeof window !== 'undefined') {
  window._VERSION_ = '${pkg.version}'
}`

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      footer
    }
  ],
  external: [''],
  plugins: [externals(), typescript(), commonjs(), resolve(), json()]
}
