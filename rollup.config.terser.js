import terser from "@rollup/plugin-terser";

export default {
  input: ['./www/index.js'],
  output: [{
    format: 'es',
    dir: 'www'
  }],
  plugins: [,
    terser()
  ]
}