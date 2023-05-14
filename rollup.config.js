import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { execSync } from 'child_process'

const copyTypes = () => ({
  name: 'copy-types',
  buildEnd: () => {
    execSync('cp www/types')
  }
  
})


const copyWorkers = () => {
  execSync('cp ./node_modules/@vandeurenglenn/editor-fields/exports/ts.worker.js www/ts.worker.js')
  execSync('cp ./node_modules/@vandeurenglenn/editor-fields/exports/html.worker.js www/html.worker.js')
  execSync('cp ./node_modules/@vandeurenglenn/editor-fields/exports/css.worker.js www/css.worker.js')
  execSync('cp ./node_modules/@vandeurenglenn/editor-fields/exports/editor.worker.js www/editor.worker.js')
  execSync('cp -r ./node_modules/@vandeurenglenn/editor-fields/exports/fonts www')
  return
}
export default {
  input: ['./src/index.ts'],
  output: [{
    format: 'es',
    dir: 'www'
  }],
  external: [
    './field-templates/custom-el.js'
  ],
  plugins: [
    nodeResolve(),
    typescript({
      compilerOptions: {
        outDir: 'www',
        declarationDir: 'www/types'    
      }
    }),
    copyWorkers()
  ]
}