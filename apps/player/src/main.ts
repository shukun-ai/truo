import { ElementRegister } from './core/element-register';
import { LowCodeRegister } from './core/low-code-register';
import { PageRegister } from './core/page-register';
import { StoreRegister } from './core/store-register';

class Main {
  async initialize() {
    const lowCodeRegister = new LowCodeRegister();
    await lowCodeRegister.initialize();
    const elementRegister = new ElementRegister();
    await elementRegister.initialize();

    const storeRegister = new StoreRegister(lowCodeRegister, elementRegister);
    const pageRegister = new PageRegister(storeRegister, lowCodeRegister);
    pageRegister.initialize();
  }
}

new Main().initialize();
