import { ConfigManager } from '../config/config-manager';

import { PageController } from '../controller/page-controller';
import { EventQueue } from '../event/event-queue';
import { RepositoryManager } from '../repository/repository-manager';
import { TemplateService } from '../template/template-service';

import { LocalLoader } from './local-loader';

describe('PageController', () => {
  let repositoryManager: RepositoryManager;
  let pageController: PageController;

  beforeEach(async () => {
    const loader = new LocalLoader();
    const definitions = await loader.load();
    const configManager = new ConfigManager(definitions);
    const templateService = new TemplateService();
    repositoryManager = new RepositoryManager();
    const eventQueue = new EventQueue(repositoryManager);
    pageController = new PageController(
      configManager,
      repositoryManager,
      eventQueue,
      templateService,
    );
  });

  describe('mountApp', () => {
    it('should ', () => {
      pageController.mountApp();
    });
  });
});
