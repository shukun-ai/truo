import { html } from 'lit';

import { WidgetElement } from '../../core/widget-element';

import { widgetSchema } from '../../decorators/widget-schema';

@widgetSchema({
  tag: 'sk-button',
  properties: {
    text: {
      expectedType: 'string',
      editLabel: 'Value',
      editType: 'template',
    },
  },
  events: {
    clicked: {
      editLabel: 'When clicked',
    },
  },
})
export class ButtonWidget extends WidgetElement {
  text?: string;

  override render() {
    return html`<button @click=${this.onClick}>${this.text}</button>`;
  }

  private onClick() {
    this.emit('clicked', undefined);
  }
}
