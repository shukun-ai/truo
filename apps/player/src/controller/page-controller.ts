import { PlayerContainer, PlayerWidget } from '@shukun/schema';
import { combineLatest, distinctUntilChanged, map, Subscription } from 'rxjs';

import { IConfigManager } from '../config/config-manager.interface';
import { IEventQueue } from '../event/event-queue.interface';
import { IRepositoryManager } from '../repository/repository-manager.interface';
import { ITemplateService } from '../template/template-service.interface';

export class PageController {
  constructor(
    private readonly configManager: IConfigManager,
    private readonly repositoryManager: IRepositoryManager,
    private readonly eventQueue: IEventQueue,
    private readonly templateService: ITemplateService,
  ) {}

  private subscriptions = new Map<string, Subscription>();

  private listeners = new Set<string>();

  mountApp() {
    // emit app start
    // create ref
    const main = document.createElement('div');
    main.id = 'main-container';
    const root = document.getElementById('root');
    root?.append(main);
    // listen router changed
    this.mountPage('home');
    // emit app ready
  }

  unmountApp() {
    // cancel listen router changed
    // unmount page
    // emit app unmount
  }

  private mountPage(containerName: string) {
    this.mountContainer(containerName);
    // emit page mount
  }

  private unmountPage() {
    // emit page unmount
  }

  private mountContainer(containerName: string) {
    const container = this.configManager.getContainer(containerName);
    // register repositories
    this.repositoryManager.register(container.repositories);
    // assemble widget tree
    const mainContainer = document.getElementById('main-container');
    if (!mainContainer) {
      throw new Error();
    }
    this.assembleWidgetTree(container.root, mainContainer, container);
  }

  private unmountContainer() {
    // cancel listen
    // unsubscribe
    // unregister
    // destroy tree
  }

  private assembleWidgetTree(
    widgetNames: string[],
    parentWidget: HTMLElement,
    container: PlayerContainer,
  ) {
    widgetNames.forEach((name) => {
      const schema = container.widgets[name];
      const widget = this.mountWidget(container, schema);
      parentWidget.append(widget);

      const nextWidgetNames = container.tree[name] ?? [];
      if (nextWidgetNames.length === 0) {
        return;
      }
      this.assembleWidgetTree(nextWidgetNames, widget, container);
    });
  }

  private mountWidget(container: PlayerContainer, schema: PlayerWidget) {
    const widget = document.createElement(schema.tag);
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
    widget: HTMLElement,
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
      widget.setAttribute(state, value as any);
    });

    return subscription;
  }

  private listenCustomEvent(
    container: PlayerContainer,
    widget: HTMLElement,
    eventName: string,
    behaviors: string[],
  ) {
    widget.addEventListener(eventName, (event) => {
      behaviors.forEach((behavior) => {
        const eventBehavior = container.events[behavior];
        this.eventQueue.emit(eventBehavior, (event as any)?.detail);
      });
    });
  }
}
