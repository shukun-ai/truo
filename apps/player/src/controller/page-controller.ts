import { TypeException } from '@shukun/exception';
import { PlayerContainer, PlayerWidget } from '@shukun/schema';
import { ShukunWidget, ShukunWidgetClass } from '@shukun/widget';
import { combineLatest, distinctUntilChanged, map, Subscription } from 'rxjs';

import { IConfigManager } from '../config/config-manager.interface';
import { IEventQueue } from '../event/event-queue.interface';

import { IRepositoryManager } from '../repository/repository-manager.interface';
import { IRepository } from '../repository/repository.interface';
import { ITemplateService } from '../template/template-service.interface';

import { CurrentContainer } from './current-container';

import { CustomRepositoryService } from './custom-repository-service';

import { IPageController } from './page-controller.interface';
import { RouterRepository } from './repositories/router-repository';

export class PageController implements IPageController {
  private CURRENT_USER_REPOSITORY_KEY = 'currentUser';
  private ROUTER_REPOSITORY_KEY = 'router';

  private customRepositoryService: CustomRepositoryService;
  private subscriptions = new Map<string, Subscription>();
  private listeners = new Set<string>();
  private currentWidgets = new Map<string, ShukunWidget>();
  private currentContainer: CurrentContainer;

  constructor(
    private readonly configManager: IConfigManager,
    private readonly repositoryManager: IRepositoryManager,
    private readonly eventQueue: IEventQueue,
    private readonly templateService: ITemplateService,
  ) {
    this.customRepositoryService = new CustomRepositoryService(
      this.repositoryManager,
    );
    this.currentContainer = new CurrentContainer();
  }

  mountApp(root: HTMLElement) {
    // emit app start
    // create ref
    // const root = document.getElementById('root');
    // listen router changed
    // const widget = this.mountPage('home');
    // root.append(widget.getHTMLElement());
    // emit app ready
    this.listenRouterChanges(root);
  }

  changeContainer(page: string, root: HTMLElement) {
    if (this.currentContainer.exits()) {
      this.unmountContainer(
        root,
        this.currentContainer.getPageName(),
        this.currentContainer.getContainer(),
      );
    }

    const ContainerWidget = this.configManager.getWidgetClass('sk-container');
    const containerWidget = new ContainerWidget();
    this.mountContainer(root, page, containerWidget);
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

  public getWidget(
    containerName: string,
    widgetInstanceName: string,
  ): ShukunWidget {
    const widget = this.currentWidgets.get(widgetInstanceName);
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
    if (this.currentWidgets.has(widgetInstanceName)) {
      throw new TypeException('The widget is added: {{widgetInstanceName}}', {
        widgetInstanceName,
      });
    }
    this.currentWidgets.set(widgetInstanceName, widget);
  }

  private mountContainer(
    root: HTMLElement,
    pageName: string,
    container: ShukunWidget,
  ): void {
    const containerDefinition = this.configManager.getContainer(pageName);
    // register repositories
    this.customRepositoryService.register(containerDefinition.repositories);
    // assemble widget tree
    this.assembleWidgetTree(
      pageName,
      containerDefinition.root,
      container,
      containerDefinition,
    );
    root.append(container.getHTMLElement());
    console.log(pageName, root.innerHTML);
    this.currentContainer.set(pageName, container);
  }

  // private mountNotFound() {
  //   const ContainerWidget = this.configManager.getWidgetClass('sk-container');
  //   const notFoundWidget = new ContainerWidget();
  //   notFoundWidget.getHTMLElement().innerHTML = '404';
  //   return notFoundWidget;
  // }

  private unmountContainer(
    root: HTMLElement,
    pageName: string,
    container: ShukunWidget,
  ) {
    // cancel listen
    // unsubscribe
    // unregister
    // destroy tree
    root.removeChild(container.getHTMLElement());
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
