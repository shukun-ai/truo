import { StaticFileLoader } from './loader/static-file-loader';
import { PageContainer } from './page/page-container';
import { StoreContainer } from './store/store-container';

class Main {
  async initialize() {
    await this.loadFiles();
    this.mount();
  }

  async loadFiles() {
    const staticFileLoader = new StaticFileLoader();
    await staticFileLoader.load();
  }

  mount() {
    const storeContainer = new StoreContainer();
    const pageContainer = new PageContainer(storeContainer);
    pageContainer.initialize();

    setTimeout(() => {
      storeContainer.dispatch();
    }, 3000);
  }
}

new Main().initialize();
