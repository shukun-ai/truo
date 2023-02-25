import { ShukunWidget } from '@shukun/widget';

import { IConfigManager } from '../config/config-manager.interface';
import { IEventQueue } from '../event/event-queue.interface';

import { IRepositoryManager } from '../repository/repository-manager.interface';
import { IRepository } from '../repository/repository.interface';
import { ITemplateService } from '../template/template-service.interface';

import { Container } from './container';

import { CustomRepositoryService } from './custom-repository-service';

import { IPageController } from './page-controller.interface';
import { RouterRepository } from './repositories/router-repository';

export class PageController implements IPageController {
  private CURRENT_USER_REPOSITORY_KEY = 'currentUser';
  private ROUTER_REPOSITORY_KEY = 'router';

  private customRepositoryService: CustomRepositoryService;
  private currentContainer: Container | null = null;

  constructor(
    private readonly configManager: IConfigManager,
    private readonly repositoryManager: IRepositoryManager,
    private readonly eventQueue: IEventQueue,
    private readonly templateService: ITemplateService,
  ) {
    this.customRepositoryService = new CustomRepositoryService(
      this.repositoryManager,
    );
  }

  mountApp(root: HTMLElement) {
    // emit app start
    // create ref
    // listen router changed
    this.listenRouterChanges(root);
    // emit app ready
  }

  changeContainer(page: string, root: HTMLElement) {
    if (this.currentContainer) {
      this.unmountContainer(root, this.currentContainer);
    }

    this.mountContainer(root, page);
  }

  public registerRouterRepository(repository: IRepository) {
    this.repositoryManager.add(this.ROUTER_REPOSITORY_KEY, repository);
  }

  public registerCurrentUserRepository(repository: IRepository) {
    this.repositoryManager.add(this.CURRENT_USER_REPOSITORY_KEY, repository);
  }

  private listenRouterChanges(root: HTMLElement) {
    const routerRepository = this.repositoryManager.get(
      this.ROUTER_REPOSITORY_KEY,
    ) as RouterRepository;
    routerRepository.query().subscribe((router) => {
      this.changeContainer(router.page, root);
    });
  }

  private mountContainer(root: HTMLElement, containerName: string): void {
    const container = new Container(
      this.configManager,
      this.repositoryManager,
      this.eventQueue,
      this.templateService,
      this.customRepositoryService,
    );

    container.mount(containerName);
    const containerWidget = container.getContainerWidget();
    root.appendChild(containerWidget.getHTMLElement());
    this.currentContainer = container;
  }

  private unmountContainer(root: HTMLElement, container: Container) {
    container.umount();
    root.removeChild(container.getContainerWidget().getHTMLElement());
    this.currentContainer = null;
  }

  // private mountNotFound() {
  //   const ContainerWidget = this.configManager.getWidgetClass('sk-container');
  //   const notFoundWidget = new ContainerWidget();
  //   notFoundWidget.getHTMLElement().innerHTML = '404';
  //   return notFoundWidget;
  // }
}
