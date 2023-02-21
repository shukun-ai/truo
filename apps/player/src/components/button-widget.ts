import { AbstractWidget } from './abstract-widget';

export class ButtonWidget extends AbstractWidget {
  override update(name: string, payload: unknown): void {
    console.log('container');
  }
}
