import { html } from 'lit';

import { WidgetElement } from '../../core/widget-element';
import { widgetSchema } from '../../decorators/widget-schema';

@widgetSchema({
  tag: 'sk-container',
  properties: {},
  events: {},
})
export class ContainerWidget extends WidgetElement {
  override render() {
    return html`<div style="padding: 20px; background: red;">
      <slot></slot>
    </div>`;
  }
}
