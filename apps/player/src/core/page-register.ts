import { LowCodeRegister } from './low-code-register';
import { Page } from './page';
import { RootManager } from './root-manager';
import { StoreRegister } from './store-register';

export class PageRegister {
  currentPage?: Page;

  constructor(
    private readonly storeRegister: StoreRegister,
    private readonly lowCodeRegister: LowCodeRegister,
  ) {}

  initialize() {
    this.listenRouterChanged();
  }

  listenRouterChanged() {
    const pageName = 'home';
    this.routerChanged(pageName);
  }

  private routerChanged(pageName: string) {
    if (this.currentPage) {
      this.currentPage.unmount();
    }
    const page = this.lowCodeRegister.getPage(pageName);
    this.currentPage = new Page(pageName, this.storeRegister, page);
    const pageRef = this.currentPage.create();
    const rootManager = new RootManager();
    rootManager.append(pageRef);
    this.currentPage.mount();
  }
}
