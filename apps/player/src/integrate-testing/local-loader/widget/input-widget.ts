import { AbstractWidget } from '@shukun/widget';

export class InputWidget extends AbstractWidget {
  override element!: HTMLInputElement;

  override created(): void {
    super.created();
    this.element = document.createElement('input');
    this.element.addEventListener('click', (event: any) => {
      this.emit('value-changed', event.target.value);
    });
  }

  override update(name: string, payload: any): void {
    if (name === 'value') {
      this.element.setAttribute(name, payload);
    }
  }
}
