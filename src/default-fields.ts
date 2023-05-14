
const fields = {
  'custom-el.js': {code: [
    `import { LitElement, html, css } from 'lit'

export default class CustomEl extends LitElement {
  static styles = [`,
  'css`\n',
  `\t\t:host {
      display: block;
    }\n`,
  '\t`];',
  `

  render() {
    return html`,
    '``;',
    `
  }
}`

  ].join(''), language: 'javascript'},
  'index.html': {
    code: `<!DOCTYPE html>
<head>
  <script type="module" src="./custom-el.js"></script>
</head>
<body>
  <custom-el name="World"></custom-el>
</body>`,
    language: 'html'
  }
}

export default fields