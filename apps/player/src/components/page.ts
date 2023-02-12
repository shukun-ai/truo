export class Page extends HTMLElement {
  rendered = false;

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
    // this.innerHTML = `nihaohaohao`;
  }
}
