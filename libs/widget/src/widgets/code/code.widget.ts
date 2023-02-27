import { html } from 'lit';

import { WidgetElement } from '../../core/widget-element';
import { widgetSchema } from '../../decorators/widget-schema';

@widgetSchema({
  tag: 'sk-code',
  properties: {
    value: {
      expectedType: 'mixed',
      editLabel: 'Display Code',
      editType: 'template',
    },
  },
  events: {},
})
export class CodeWidget extends WidgetElement {
  value = '';

  override render() {
    return html`<code>${JSON.stringify(this.value)}</code>`;
  }
}
