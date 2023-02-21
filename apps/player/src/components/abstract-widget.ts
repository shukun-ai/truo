import { ShukunWidget } from './component.interface';

export class AbstractWidget implements ShukunWidget {
  ref!: HTMLDivElement;

  events = new Map<string, (payload: any) => void>();

  constructor() {
    this.mount();
  }

  getRef() {
    return this.ref;
  }

  mount() {
    this.ref = document.createElement('div');
  }

  update(name: string, payload: unknown): void {
    throw new Error('Method not implemented.');
  }

  emit(eventName: string, payload: any): void {
    const callback = this.events.get(eventName);
    if (!callback) {
      throw new Error();
    }
    callback(payload);
  }

  append(widget: ShukunWidget): void {
    this.ref.append(widget.getRef());
  }

  addEventListener(eventName: string, callback: (payload: any) => void): void {
    this.events.set(eventName, callback);
  }
}
