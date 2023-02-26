import { html, LitElement } from 'lit';

export class InputWidget extends LitElement {
  static override properties = {
    value: { type: String },
  };

  value: string;

  constructor() {
    super();

    this.value = '';
  }

  override render() {
    return html`<input
      value=${this.value}
      click=${(event: any) =>
        this.dispatchEvent(
          new CustomEvent('value-changed', event.target.detail),
        )}
    />`;
  }
}
