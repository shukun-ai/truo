import { html, render } from 'lit-html';

export class Input extends HTMLElement {
  rendered = false;

  input?: HTMLInputElement;

  static get observedAttributes() {
    return ['value'];
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const template = html`
      <input
        type="text"
        value=${this.getAttribute('value') ?? ''}
        @change=${this.emitChange.bind(this)}
      />
    `;
    render(template, this);
  }

  emitChange(event: { target: { value: string } }) {
    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: { value: event.target.value },
      }),
    );
  }
}
