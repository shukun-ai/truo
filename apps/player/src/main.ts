import { ConfigManager } from './config/config-manager';
import { PageController } from './controller/page-controller';
import { EventQueue } from './event/event-queue';
import { LocalLoader } from './loader/local-loader';
import { RepositoryManager } from './repository/repository-manager';
import { TemplateService } from './template/template-service';

class Main {
  async start() {
    const loader = new LocalLoader();
    const definitions = await loader.load();
    const configManager = new ConfigManager(definitions);
    const templateService = new TemplateService();
    const repositoryManager = new RepositoryManager();
    const eventQueue = new EventQueue(repositoryManager);

    const pageController = new PageController(
      configManager,
      repositoryManager,
      eventQueue,
      templateService,
    );

    pageController.mountApp();

    setTimeout(() => {
      repositoryManager.setValue('form1', ['deviceNumber'], 2);
      // repositoryManager.setValue('form1', ['value'], { name: 'Bob' });
    }, 3000);
  }
}

new Main().start();
