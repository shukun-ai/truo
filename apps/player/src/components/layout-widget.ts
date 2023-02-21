import { AbstractWidget } from './abstract-widget';

export class LayoutWidget extends AbstractWidget {
  override update(name: string, payload: unknown): void {
    console.log('container');
  }
}
