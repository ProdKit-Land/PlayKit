import { LitElement, html, css } from 'lit';

import fields from './fields.js'
import '@vandeurenglenn/editor-fields'
import {EditorFields} from '@vandeurenglenn/editor-fields/fields'
import 'custom-tabs/custom-tab.js'
import 'custom-tabs/custom-tabs.js';


export class AppIndex extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }
    `
  ];

  get editorFields(): EditorFields {
    // @ts-ignore
    return this.renderRoot.querySelector('editor-fields')
  }

  get tabs(): HTMLElement {
    // @ts-ignore
    return this.renderRoot.querySelector('custom-tabs')
  }

  async connectedCallback() {
    super.connectedCallback()
    await this.updateComplete
    
    console.log(this.renderRoot.innerHTML);

    await this.#setupFields()
  }

  async #setupFields() {
    const tab = document.createElement('custom-tab')

    for (const [path, {code, language}] of Object.entries(fields)) {
      tab.innerHTML = `<span>${path}</span>`
      tab.dataset.route = path
      this.tabs.appendChild(tab.cloneNode(true))
      this.editorFields.createModel(path, code, language)
    }

    this.editorFields.addField('custom-el.js')
    this.tabs.select('custom-el.js')
    // this.editorFields.setModel('')
  }

  render() {
    return html`
    <custom-tabs attr-for-selected="data-route" @selected=${({detail}) => this.editorFields.setModel(detail)}>
      
    </custom-tabs>

    <editor-fields></editor-fields>
    `;
  }
}

customElements.define('app-index', AppIndex)