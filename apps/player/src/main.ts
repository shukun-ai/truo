import { ConfigManager } from './config/config-manager';
import { PageController } from './controller/page-controller';
import { RepositoryManager } from './repository/repository-manager';
import { TemplateService } from './template/template.service';

class Main {
  async start() {
    const configManager = new ConfigManager();
    await configManager.load();
    configManager.registerWidgets();

    const templateService = new TemplateService();
    const repositoryManager = new RepositoryManager();

    const pageController = new PageController(
      configManager,
      repositoryManager,
      templateService,
    );

    pageController.mountApp();

    setTimeout(() => {
      // storeRegister.updateState('e2.value', 'World!');
      repositoryManager.set('form1', ['value'], 'nihao');
    }, 3000);
  }
}

new Main().start();
