import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { execSync } from 'child_process'

const copyTypes = () => ({
  name: 'copy-types',
  buildEnd: () => {
    execSync('cp www/types')
  }
  
})


const copyWorkers = () => {
  execSync('cp -r ./node_modules/@vandeurenglenn/editor-fields/exports/* www')
  return
}
export default {
  input: ['./src/index.ts'],
  output: [{
    format: 'es',
    dir: 'www'
  }],
  external: [
    './fields.js'
  ],
  plugins: [,
    copyWorkers(),
    nodeResolve(),
    typescript({
      compilerOptions: {
        outDir: 'www',
        declarationDir: 'www/types',
        experimentalDecorators: true
      }
    }),
    terser()
  ]
}