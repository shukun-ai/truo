export class Text extends HTMLElement {
  rendered = false;

  static get observedAttributes() {
    return ['title'];
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
    this.innerHTML = `${this.title}`;
  }
}
