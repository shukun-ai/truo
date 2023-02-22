import { AbstractWidget } from '@shukun/widget';

export class ButtonWidget extends AbstractWidget {
  override update(name: string, payload: unknown): void {
    console.log('container', name, payload);
  }
}
