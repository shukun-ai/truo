import { PlayerContainer, PlayerWidget } from '@shukun/schema';
import { combineLatest, distinctUntilChanged, map, Subscription } from 'rxjs';

import { IApiRequester } from '../apis/requester.interface';

import { IConfigManager } from '../config/config-manager.interface';
import { IEventQueue } from '../event/event-queue.interface';
import { ILoader } from '../loader/loader.interface';

import { IRepositoryManager } from '../repository/repository-manager.interface';
import { IRepository } from '../repository/repository.interface';
import { IAuthStorage } from '../storages/auth-storage.interface';
import { ITemplateService } from '../template/template-service.interface';

import { IAppController } from './app-controller.interface';

import { CustomRepositoryService } from './custom-repository-service';
import { assembleWidgetTree } from './helpers/assemble-widget-tree';
import { createCustomElement } from './helpers/create-custom-element';
import { registerReboot } from './internal-style-register';

import { RouterRepository } from './repositories/router-repository';
import { ThemeRepository } from './repositories/theme-repository';

export class AppController implements IAppController {
  private CURRENT_USER_REPOSITORY_KEY = 'currentUser';
  private THEME_REPOSITORY_KEY = 'theme';
  private ROUTER_REPOSITORY_KEY = 'router';

  private customRepositoryService: CustomRepositoryService;
  private subscriptions = new Map<string, Subscription>();
  private activePage: string | null = null;

  constructor(
    private readonly authStorage: IAuthStorage,
    private readonly apiRequester: IApiRequester,
    private readonly loader: ILoader,
    private readonly configManager: IConfigManager,
    private readonly repositoryManager: IRepositoryManager,
    private readonly eventQueue: IEventQueue,
    private readonly templateService: ITemplateService,
  ) {
    this.customRepositoryService = new CustomRepositoryService(
      this.repositoryManager,
    );
  }

  public registerRouterRepository(repository: IRepository) {
    this.repositoryManager.add(this.ROUTER_REPOSITORY_KEY, repository);
  }

  public registerCurrentUserRepository(repository: IRepository) {
    this.repositoryManager.add(this.CURRENT_USER_REPOSITORY_KEY, repository);
    this.repositoryManager.add(
      this.THEME_REPOSITORY_KEY,
      new ThemeRepository(),
    );
  }

  public async mountApp(root: HTMLElement) {
    registerReboot();
    const routerRepository = this.repositoryManager.get(
      this.ROUTER_REPOSITORY_KEY,
    ) as RouterRepository;

    const router = routerRepository.getValue();
    const definitions = await this.loader.load(router.orgName, router.app);
    await this.configManager.register(definitions);

    // emit app start
    // create ref
    // listen router changed
    this.listenRouterChanges(root);
    // emit app ready
  }

  private listenRouterChanges(root: HTMLElement) {
    const routerRepository = this.repositoryManager.get(
      this.ROUTER_REPOSITORY_KEY,
    ) as RouterRepository;
    routerRepository.query().subscribe((router) => {
      this.switchPage(router.page, root);
    });
  }

  private switchPage(page: string, root: HTMLElement) {
    if (this.activePage) {
      this.unmountContainer(root, this.activePage);
      this.activePage = null;
    }

    this.mountContainer(root, page);
    this.activePage = page;
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
  }

  private bindWidget(context: {
    widgetId: string;
    widgetDefinition: PlayerWidget;
    containerId: string;
    containerDefinition: PlayerContainer;
  }) {
    // subscribe repository
    for (const [property, template] of Object.entries(
      context.widgetDefinition.properties,
    )) {
      const subscription = this.createSubscription(
        context.widgetId,
        context.containerId,
        property,
        template,
      );
      this.subscriptions.set(
        this.getStateId(context.containerId, context.widgetId, property),
        subscription,
      );
    }
    // listen event emit
    for (const [event, behavior] of Object.entries(
      context.widgetDefinition.events,
    )) {
      this.listenCustomEvent(
        context.widgetId,
        context.containerId,
        event,
        behavior,
      );
    }
  }

  private createSubscription(
    widgetId: string,
    containerId: string,
    propertyName: string,
    template: string,
  ) {
    const literal = this.templateService.parse(template);

    if (literal.codes.length === 0) {
      const staticValue = this.templateService.evaluate(literal, []);
      this.updateElementProperty(
        containerId,
        widgetId,
        propertyName,
        staticValue,
      );
    }

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
      this.updateElementProperty(containerId, widgetId, propertyName, value);
    });

    return subscription;
  }

  private updateElementProperty(
    containerId: string,
    widgetId: string,
    propertyName: string,
    value: unknown,
  ) {
    const element = document.getElementById(
      this.getCustomElementId(containerId, widgetId),
    );
    if (element) {
      (element as any)[propertyName] = value;
    } else {
      console.error('Did not find element when get states', {
        containerId,
        widgetId,
        propertyName,
        value,
      });
    }
  }

  private listenCustomEvent(
    widgetId: string,
    containerId: string,
    eventName: string,
    behaviors: string[],
  ): void {
    const element = document.getElementById(
      this.getCustomElementId(containerId, widgetId),
    );
    const definition = this.configManager.getContainer(containerId);
    if (element) {
      element.addEventListener(eventName, (event: any) => {
        behaviors.forEach((behavior) => {
          const eventBehavior = definition.events[behavior];
          this.eventQueue.emit(eventBehavior, event.detail);
        });
      });
    } else {
      console.error('Did not find element when listen.', {
        widgetId,
        containerId,
        eventName,
        behaviors,
      });
    }
  }

  private unmountContainer(root: HTMLElement, containerId: string) {
    const definition = this.configManager.getContainer(containerId);
    const container = document.getElementById(
      this.getCustomElementId(containerId, 'main-container'),
    );
    if (container) {
      this.unbindContainer(definition, containerId);
      root.removeChild(container);
    }
    this.customRepositoryService.unregister(definition.repositories);
  }

  private unbindContainer(
    definition: PlayerContainer,
    containerId: string,
  ): void {
    for (const [widgetId, widgetDefinition] of Object.entries(
      definition.widgets,
    )) {
      for (const [property] of Object.keys(widgetDefinition.properties)) {
        const key = this.getStateId(containerId, widgetId, property);
        const subscription = this.subscriptions.get(key);
        if (subscription) {
          subscription.unsubscribe();
          this.subscriptions.delete(key);
        }
      }
    }
  }

  private getCustomElementId(containerId: string, widgetId: string) {
    return `${containerId}-${widgetId}`;
  }

  private getStateId(containerId: string, widgetId: string, stateId: string) {
    return `${containerId}-${widgetId}-${stateId}`;
  }

  private getEventId(containerId: string, widgetId: string, eventId: string) {
    return `${containerId}-${widgetId}-${eventId}`;
  }
}
