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
    if (!this.input) {
      this.input = document.createElement('input');
      this.input.type = 'input';
      this.append(this.input);
    }
    this.input.value = this.getAttribute('value') ?? '';
  }
}
