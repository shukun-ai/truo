import { AbstractWidget } from '@shukun/widget';

export class TextWidget extends AbstractWidget {
  override created(): void {
    super.created();
  }

  override update(name: string, payload: any): void {
    if (name === 'value') {
      this.element.setAttribute(name, payload);
    }
  }
}
