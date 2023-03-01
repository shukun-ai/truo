import { html, css } from 'lit';

import { WidgetElement } from '../../core/widget-element';
import { widgetSchema } from '../../decorators/widget-schema';

@widgetSchema({
  tag: 'sk-container',
  properties: {},
  events: {},
})
export class ContainerWidget extends WidgetElement {
  static override styles = css`
    div {
      padding: 20px;
      background: var(--sk-info);
    }
  `;

  override render() {
    return html`<div>
      <slot></slot>
    </div>`;
  }
}
