export abstract class BaseCustomElement extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  titleChanged = new CustomEvent('title-changed', {
    detail: {
      title: this.getAttribute('title'),
    },
  });

  rendered = false;

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
    console.log('hi', name, oldValue, newValue);
    this.dispatchEvent(this.titleChanged);
    this.render();
  }

  render() {
    this.innerHTML = `Counter ${this.title}`;
  }
}
