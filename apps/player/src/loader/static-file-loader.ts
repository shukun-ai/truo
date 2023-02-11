export class StaticFileLoader {
  async load() {
    const Component = await import('../components/time-counter');
    customElements.define('time-counter', Component.TimeCounter);
  }
}
