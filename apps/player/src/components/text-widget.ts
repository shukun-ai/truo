import { AbstractWidget } from '@shukun/widget';
import { html, render } from 'lit-html';

export class TextWidget extends AbstractWidget {
  override update(name: string, payload: any): void {
    const template = html`<p>Hello, ${payload}</p> `;
    render(template, this.getHTMLElement());
  }
}
