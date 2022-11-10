import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import builtins from 'builtin-modules'
import pkg from './package.json';

export default {
  external: builtins,
  input: './src/index.ts',
  plugins: [
    typescript({
      tsconfigDefaults: {compilerOptions: {}},
      tsconfig: "tsconfig.json",
      tsconfigOverride: {compilerOptions: {}},
      useTsconfigDeclarationDir: true
    }),
    terser(),
    json(),
    commonjs(),
    nodeResolve({
      mainFields: ['module', 'main'],
      // preferBuiltins: false
    })
  ],
  output: [
    {
      format: 'esm',
      file: pkg.module
    }, {
      format: 'cjs',
      file: pkg.main
    }
  ],
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}