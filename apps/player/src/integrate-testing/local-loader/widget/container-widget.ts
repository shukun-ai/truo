import { AbstractWidget } from '@shukun/widget';

export class ContainerWidget extends AbstractWidget {
  override created(): void {
    super.created();
    this.element.id = 'sk-container';
  }
}
