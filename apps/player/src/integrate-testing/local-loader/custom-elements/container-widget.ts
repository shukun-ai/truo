import { html, LitElement } from 'lit';

export class ContainerWidget extends LitElement {
  static override properties = {
    value: { type: String },
  };

  value: string;

  constructor() {
    super();

    this.value = '';
  }

  override render() {
    return html`<div style="padding: 20px; background: red;">
      <slot></slot>
    </div>`;
  }
}
