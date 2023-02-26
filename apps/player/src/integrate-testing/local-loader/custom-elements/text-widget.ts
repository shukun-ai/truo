import { html, LitElement } from 'lit';

export class TextWidget extends LitElement {
  static override properties = {
    value: { type: String },
  };

  value: string;

  constructor() {
    super();

    this.value = '';
  }

  override render() {
    return html` Hello, ${this.value} `;
  }
}
