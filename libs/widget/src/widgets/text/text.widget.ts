import { html } from 'lit-html';

import { WidgetElement } from '../../core/widget-element';
import { widgetSchema } from '../../decorators/widget-schema';

@widgetSchema({
  tag: 'sk-text',
  properties: {
    value: {
      expectedType: 'string',
      editLabel: 'Display Text',
      editType: 'template',
    },
  },
  events: {},
})
export class TextWidget extends WidgetElement {
  value = '';

  override render() {
    return html` Hello, ${this.value} `;
  }
}
