import { html } from 'lit';

import { WidgetElement } from '../../core/widget-element';

import { widgetSchema } from '../../decorators/widget-schema';

@widgetSchema({
  tag: 'sk-input',
  properties: {
    value: {
      expectedType: 'string',
      editLabel: 'Value',
      editType: 'template',
    },
  },
  events: {
    'value-changed': {
      editLabel: 'When Value Changed',
    },
  },
})
export class InputWidget extends WidgetElement {
  value = '';

  override render() {
    return html`<input value=${this.value} @change=${this.onChange} />`;
  }

  private onChange(event: { target?: { value?: string } }) {
    this.emit('value-changed', event?.target?.value);
  }
}
