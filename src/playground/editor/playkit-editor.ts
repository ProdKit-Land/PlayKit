import { html, css, LitElement } from 'lit';
import { state, query, property, customElement } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

@customElement('playground-editor')
export class PlaygroundEditor extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) language = 'typescript';
  @property({ type: String }) path = '';
  @property({ type: String }) theme = 'vs-dark';
  @property({ type: Object }) options = {};
  @property({ type: Object }) overrideServices = {};
  @property({ type: String }) idName = 'editor';
  @property({ type: Object }) dimensions = { width: 500, height: 400 };
  // @property({ type: Number }) line: number | undefined; // TODO

  @state() private _editorInitialized = false;
  @state() private _keepCurrentModel = false; // TODO
  @state() private _saveView = true; // TODO

  @query('#editor', true) private editorElement!: HTMLElement;

  private editor!: monaco.editor.IStandaloneCodeEditor;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    #editor {
      width: 100%;
      height: 100%;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadMonacoEditor();
  }

  async loadMonacoEditor() {
    if (this.editorElement && !this.editor) {
      await import('monaco-editor');

      monaco.editor.defineTheme(this.theme, {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#1e1e1e',
          'editor.foreground': '#d4d4d4',
        },
      });

      this.editor = monaco.editor.create(this.editorElement, {
        value: this.value,
        language: this.language,
        theme: this.theme,
        ...this.options,
        ...this.overrideServices,
        ...this.dimensions,
      });
    }
    this._editorInitialized = true;
  }

  firstUpdated(changedProperties: Map<string, unknown>): void {
    this.updateEditorProperties(changedProperties);
  }

  updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);
    this.updateEditorProperties(changedProperties);
  }

  updateEditorProperties(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('value') && this.editor) {
      this.editor.setValue(this.value);
    }

    if (changedProperties.has('language') && this.editor) {
      monaco.editor.setModelLanguage(this.editor.getModel()!, this.language);
    }

    if (changedProperties.has('theme') && this.editor) {
      monaco.editor.setTheme(this.theme);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.disposeEditor();
  }

  disposeEditor() {
    if (this.editor) {
      this.editor.dispose();
      this.editor = undefined!;
    }
  }

  render() {
    return html`
      ${until(
        this._editorInitialized
          ? html`<div id="editor">${this.editor}</div>`
          : html`<div>Loading Editor...</div>`,
        ''
      )}
    `;
  }
}
