import { ShukunWidget } from './shukun-widget.interface';

export abstract class AbstractWidget implements ShukunWidget {
  element!: HTMLDivElement;

  events = new Map<string, (payload: unknown) => void>();

  constructor() {
    this.created();
  }

  getHTMLElement() {
    return this.element;
  }

  append(widget: ShukunWidget): void {
    this.element.append(widget.getHTMLElement());
  }

  created() {
    this.element = document.createElement('div');
  }

  mounted() {
    // No implements
  }

  beforeUnmount(): void {
    // No implements
  }

  update(name: string, payload: unknown): void {
    throw new Error('Method not implemented.');
  }

  emit(eventName: string, payload: unknown): void {
    const callback = this.events.get(eventName);
    if (!callback) {
      throw new Error();
    }
    callback(payload);
  }

  listen(eventName: string, callback: (payload: unknown) => void): void {
    this.events.set(eventName, callback);
  }
}
