import { PlayerContainer, PlayerWidget } from '@shukun/schema';
import { combineLatest, distinctUntilChanged, map, Subscription } from 'rxjs';

import { IConfigManager } from '../config/config-manager.interface';
import { IEventQueue } from '../event/event-queue.interface';

import { IRepositoryManager } from '../repository/repository-manager.interface';
import { IRepository } from '../repository/repository.interface';
import { ITemplateService } from '../template/template-service.interface';

import { Container } from './container';

import { CustomRepositoryService } from './custom-repository-service';
import { assembleWidgetTree } from './helpers/assemble-widget-tree';
import { createCustomElement } from './helpers/create-custom-element';

import { IPageController } from './page-controller.interface';
import { RouterRepository } from './repositories/router-repository';

export class AppController implements IPageController {
  private CURRENT_USER_REPOSITORY_KEY = 'currentUser';
  private ROUTER_REPOSITORY_KEY = 'router';

  private customRepositoryService: CustomRepositoryService;
  private currentContainer: Container | null = null;
  private subscriptions = new Map<string, Subscription>();

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

  private mountContainer(root: HTMLElement, containerId: string): void {
    const definition = this.configManager.getContainer(containerId);

    this.customRepositoryService.register(definition.repositories);

    const containerElement = createCustomElement(
      containerId,
      'main-container',
      'sk-container',
    );
    root.appendChild(containerElement);

    assembleWidgetTree(containerElement, definition.root, {
      definition,
      containerName: containerId,
    });

    this.bindContainer(definition, containerId);
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

  private bindContainer(
    definition: PlayerContainer,
    containerId: string,
  ): void {
    for (const [id, widgetDefinition] of Object.entries(definition.widgets)) {
      this.bindWidget({
        widgetId: id,
        widgetDefinition,
        containerId,
        containerDefinition: definition,
      });
    }

    // // subscribe repository
    // for (const [state, template] of Object.entries(context.definition.states)) {
    //   const subscription = this.createSubscription(widget, state, template);
    //   this.subscriptions.set(`${schema.tag}:${state}`, subscription);
    // }
    // // listen event emit
    // for (const [event, behavior] of Object.entries(schema.events)) {
    //   this.listenCustomEvent(container, widget, event, behavior);
    //   this.listeners.add(`${schema.tag}:${event}`);
    // }
  }

  private bindWidget(context: {
    widgetId: string;
    widgetDefinition: PlayerWidget;
    containerId: string;
    containerDefinition: PlayerContainer;
  }) {
    // subscribe repository
    for (const [state, template] of Object.entries(
      context.widgetDefinition.states,
    )) {
      const subscription = this.createSubscription(
        context.widgetId,
        context.containerId,
        state,
        template,
      );
      this.subscriptions.set(
        `${context.containerId}-${context.widgetId}`,
        subscription,
      );
    }
    // listen event emit
    // for (const [event, behavior] of Object.entries(schema.events)) {
    //   this.listenCustomEvent(container, widget, event, behavior);
    //   this.listeners.add(`${schema.tag}:${event}`);
    // }
  }

  private createSubscription(
    widgetId: string,
    containerId: string,
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
      const element = document.getElementById(`${containerId}-${widgetId}`);
      console.log('element', element);
      if (element) {
        element.setAttribute(state, value as any);
      }
    });

    return subscription;
  }

  // private listenCustomEvent(
  //   container: PlayerContainer,
  //   widget: ShukunWidget,
  //   eventName: string,
  //   behaviors: string[],
  // ): void {
  //   widget.listen(eventName, (payload) => {
  //     behaviors.forEach((behavior) => {
  //       const eventBehavior = container.events[behavior];
  //       this.eventQueue.emit(eventBehavior, payload);
  //     });
  //   });
  // }
}
