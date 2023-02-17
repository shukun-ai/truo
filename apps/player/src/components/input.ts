export class Input extends HTMLElement {
  rendered = false;

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
    const input = document.createElement('input');
    input.type = 'input';
    this.append(input);
  }
}
