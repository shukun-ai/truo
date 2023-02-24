import { createMemoryHistory } from 'history';

import { ConfigManager } from '../config/config-manager';
import { PageController } from '../controller/page-controller';
import { CurrentUserRepository } from '../controller/repositories/current-user-repository';
import { RouterRepository } from '../controller/repositories/router-repository';
import { EventQueue } from '../event/event-queue';
import { RepositoryManager } from '../repository/repository-manager';
import { TemplateService } from '../template/template-service';

import { LocalLoader } from './local-loader';

describe('PageController', () => {
  let repositoryManager: RepositoryManager;
  let pageController: PageController;

  beforeEach(async () => {
    const history = createMemoryHistory();
    const loader = new LocalLoader();
    const definitions = await loader.load();
    const configManager = new ConfigManager(definitions);
    const templateService = new TemplateService();
    const routerRepository = new RouterRepository(history);
    const currentUserRepository = new CurrentUserRepository();
    repositoryManager = new RepositoryManager();
    const eventQueue = new EventQueue(repositoryManager);
    pageController = new PageController(
      configManager,
      repositoryManager,
      eventQueue,
      templateService,
    );
    pageController.registerRouterRepository(routerRepository);
    pageController.registerCurrentUserRepository(currentUserRepository);
  });

  describe('mountApp', () => {
    it('should change when states binding or event trigger.', () => {
      const root = document.createElement('div');
      document.body.append(root);
      pageController.mountApp(root);
      repositoryManager.setValue('form1', ['deviceNumber'], 'Bob');

      const textWidget = pageController.getWidget('home', 'w1');
      const inputWidget = pageController.getWidget('home', 'w2');

      expect(textWidget.getHTMLElement().getAttribute('value')).toEqual('Bob');
      expect(inputWidget.getHTMLElement().getAttribute('value')).toEqual('Bob');

      const input: HTMLInputElement =
        inputWidget.getHTMLElement() as HTMLInputElement;
      input.value = 'Alice';
      input.click();

      expect(textWidget.getHTMLElement().getAttribute('value')).toEqual(
        'Alice',
      );
      expect(inputWidget.getHTMLElement().getAttribute('value')).toEqual(
        'Alice',
      );
    });
  });

  describe('Listen router changed.', () => {
    it('mount the home and if the router is changed, should unmount home and mount the new page.', () => {
      // repositoryManager.
    });
  });

  describe('Listen router changed.', () => {
    it('If the new container is not defined, should return 404 page.', () => {
      //
    });
  });
});
