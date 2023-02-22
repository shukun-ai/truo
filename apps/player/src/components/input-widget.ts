import { AbstractWidget } from '@shukun/widget';
import { html, render } from 'lit-html';

export class InputWidget extends AbstractWidget {
  override update(name: string, payload: any): void {
    const template = html`
      <input
        type="text"
        value=${payload}
        @change=${this.emitChange.bind(this)}
      />
    `;
    render(template, this.getHTMLElement());
  }

  emitChange(event: any) {
    this.emit('value-changed', event?.target?.value ?? undefined);
  }
}
