import { TypeException } from '@shukun/exception';
import { ShukunWidget } from '@shukun/widget';

export class CurrentContainer {
  private pageName: string | null = null;
  private container: ShukunWidget | null = null;

  public getPageName() {
    const pageName = this.pageName;
    if (!pageName) {
      throw new TypeException('Did not find pageName');
    }
    return pageName;
  }

  public getContainer() {
    const container = this.container;
    if (!container) {
      throw new TypeException('Did not find container');
    }
    return container;
  }

  public exits() {
    return this.pageName !== null || this.container !== null;
  }

  public set(pageName: string, container: ShukunWidget) {
    this.pageName = pageName;
    this.container = container;
  }

  public clear() {
    this.pageName = null;
    this.container = null;
  }
}
