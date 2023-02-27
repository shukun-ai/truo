import { WidgetSchema } from '@shukun/schema';
import { LitElement } from 'lit';
import { Class } from 'utility-types';

export class WidgetElement extends LitElement {
  static schema: WidgetSchema;

  protected emit(eventName: string, payload: unknown) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: payload,
      }),
    );
  }
}

export type WidgetElementClass = Class<WidgetElement>;
