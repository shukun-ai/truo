import { ConfigManager } from './config/config-manager';
import { PageController } from './controller/page-controller';
import { EventQueue } from './event/event-queue';
import { RepositoryManager } from './repository/repository-manager';
import { TemplateService } from './template/template-service';

class Main {
  async start() {
    const configManager = new ConfigManager();
    await configManager.load();
    configManager.registerWidgets();

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
  }
}

new Main().start();
