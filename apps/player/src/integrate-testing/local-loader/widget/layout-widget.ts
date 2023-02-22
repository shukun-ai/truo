import { AbstractWidget } from '@shukun/widget';

export class LayoutWidget extends AbstractWidget {
  override update(name: string, payload: unknown): void {
    console.log('container');
  }
}
