import { Class } from 'utility-types';

export interface ShukunWidget {
  // REFERENCE
  getHTMLElement(): HTMLElement;
  append(widget: ShukunWidget): void;
  // LIFE CYCLE
  created(): void;
  mounted(): void;
  beforeUnmount(): void;
  // PROPERTIES
  update(name: string, payload: unknown): void;
  // EVENTS
  listen(eventName: string, callback: (payload: unknown) => void): void;
  emit(eventName: string, payload: unknown): void;
}

export type ShukunWidgetClass = Class<ShukunWidget>;
