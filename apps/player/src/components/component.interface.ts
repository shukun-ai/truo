export interface ShukunWidget {
  getRef(): HTMLElement;
  mount(): void;
  update(name: string, payload: unknown): void;
  append(widget: ShukunWidget): void;
  addEventListener(eventName: string, callback: (payload: any) => void): void;
  emit(eventName: string, payload: any): void;
}
