import { PlayerContainer, PlayerWidget } from '@shukun/schema';
import { ShukunWidget, ShukunWidgetClass } from '@shukun/widget';
import { combineLatest, distinctUntilChanged, map, Subscription } from 'rxjs';

import { IConfigManager } from '../config/config-manager.interface';
import { IEventQueue } from '../event/event-queue.interface';

import { IRepositoryManager } from '../repository/repository-manager.interface';
import { IRepository } from '../repository/repository.interface';
import { ITemplateService } from '../template/template-service.interface';

import { CustomRepositoryService } from './custom-repository-service';

import { IPageController } from './page-controller.interface';
import { RouterRepository } from './repositories/router-repository';

export class PageController implements IPageController {
  CURRENT_USER_REPOSITORY_KEY = 'currentUser';
  ROUTER_REPOSITORY_KEY = 'router';

  private customRepositoryService: CustomRepositoryService;

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

  private subscriptions = new Map<string, Subscription>();

  private listeners = new Set<string>();

  private widgets = new Map<string, ShukunWidget>();

  private containerWidget?: ShukunWidget;

  private currentPage?: string;

  mountApp(root: HTMLElement) {
    // emit app start
    // create ref
    // const root = document.getElementById('root');
    // listen router changed
    // const widget = this.mountPage('home');
    // root.append(widget.getHTMLElement());
    // emit app ready
    this.listenRouterChanges();
  }

  changeContainer(page: string) {
    if (page === this.currentPage) {
      return;
    }

    if (this.currentPage) {
      // this.unmountContainer(this.currentPage);
    }

    this.currentPage = page;
    this.mountContainer(page);
  }

  public registerRouterRepository(repository: IRepository) {
    this.repositoryManager.add(this.ROUTER_REPOSITORY_KEY, repository);
  }

  public registerCurrentUserRepository(repository: IRepository) {
    this.repositoryManager.add(this.CURRENT_USER_REPOSITORY_KEY, repository);
  }

  private listenRouterChanges() {
    const routerRepository = this.repositoryManager.get(
      this.ROUTER_REPOSITORY_KEY,
    ) as RouterRepository;
    routerRepository.query().subscribe((router) => {
      this.changeContainer(router.page);
    });
  }

  // unmountApp() {
  //   // cancel listen router changed
  //   // unmount page
  //   // emit app unmount
  // }

  public getWidget(
    containerName: string,
    widgetInstanceName: string,
  ): ShukunWidget {
    const widget = this.widgets.get(widgetInstanceName);
    if (!widget) {
      throw new Error();
    }
    return widget;
  }

  public addWidget(
    containerName: string,
    widgetInstanceName: string,
    widget: ShukunWidget,
  ) {
    if (this.widgets.has(widgetInstanceName)) {
      throw new Error();
    }
    this.widgets.set(widgetInstanceName, widget);
  }

  private mountContainer(containerName: string) {
    const container = this.configManager.getContainer(containerName);
    // register repositories
    this.customRepositoryService.register(container.repositories);
    // assemble widget tree
    const ContainerWidget = this.configManager.getWidgetClass('sk-container');
    const mainContainerWidget = new ContainerWidget();
    this.assembleWidgetTree(
      containerName,
      container.root,
      mainContainerWidget,
      container,
    );
    return mainContainerWidget;
  }

  private unmountContainer() {
    // cancel listen
    // unsubscribe
    // unregister
    // destroy tree
  }

  private assembleWidgetTree(
    containerName: string,
    widgetNames: string[],
    parentWidget: ShukunWidget,
    container: PlayerContainer,
  ) {
    widgetNames.forEach((name) => {
      const schema = container.widgets[name];
      const WidgetClass = this.configManager.getWidgetClass(schema.tag);
      const widget = this.mountWidget(container, schema, WidgetClass);
      widget.setIdentifier(name);
      parentWidget.append(widget);
      this.addWidget(containerName, name, widget);

      const nextWidgetNames = container.tree[name] ?? [];
      if (nextWidgetNames.length === 0) {
        return;
      }
      this.assembleWidgetTree(
        containerName,
        nextWidgetNames,
        widget,
        container,
      );
    });
  }

  private mountWidget(
    container: PlayerContainer,
    schema: PlayerWidget,
    WidgetClass: ShukunWidgetClass,
  ): ShukunWidget {
    const widget = new WidgetClass();
    // subscribe repository
    for (const [state, template] of Object.entries(schema.states)) {
      const subscription = this.createSubscription(widget, state, template);
      this.subscriptions.set(`${schema.tag}:${state}`, subscription);
    }
    // listen event emit
    for (const [event, behavior] of Object.entries(schema.events)) {
      this.listenCustomEvent(container, widget, event, behavior);
      this.listeners.add(`${schema.tag}:${event}`);
    }

    return widget;
  }

  private unmountWidget() {
    // TODO
  }

  private createSubscription(
    widget: ShukunWidget,
    state: string,
    template: string,
  ) {
    const literal = this.templateService.parse(template);

    const allRepositories = literal.codes.map((code) => {
      return this.repositoryManager.combineQueries(code.repositories);
    });

    const observable = combineLatest(allRepositories).pipe(
      map((allRepositories) => {
        const imports = allRepositories.map((repository) => ({
          repositories: repository,
        }));
        return this.templateService.evaluate(literal, imports);
      }),
      distinctUntilChanged(),
    );

    const subscription = observable.subscribe((value) => {
      widget.update(state, value);
    });

    return subscription;
  }

  private listenCustomEvent(
    container: PlayerContainer,
    widget: ShukunWidget,
    eventName: string,
    behaviors: string[],
  ) {
    widget.listen(eventName, (payload) => {
      behaviors.forEach((behavior) => {
        const eventBehavior = container.events[behavior];
        this.eventQueue.emit(eventBehavior, payload);
      });
    });
  }
}
