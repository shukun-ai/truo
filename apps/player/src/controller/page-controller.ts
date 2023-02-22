import { PlayerContainer, PlayerWidget } from '@shukun/schema';
import { ShukunWidget, ShukunWidgetClass } from '@shukun/widget';
import { combineLatest, distinctUntilChanged, map, Subscription } from 'rxjs';

import { ContainerWidget } from '../components/container-widget';

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
    const root = document.getElementById('root');
    // listen router changed
    const widget = this.mountPage('home');

    root?.append(widget.getHTMLElement());
    // emit app ready
  }

  unmountApp() {
    // cancel listen router changed
    // unmount page
    // emit app unmount
  }

  private mountPage(containerName: string) {
    return this.mountContainer(containerName);
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
    const mainContainerWidget = new ContainerWidget();
    this.assembleWidgetTree(container.root, mainContainerWidget, container);
    return mainContainerWidget;
  }

  private unmountContainer() {
    // cancel listen
    // unsubscribe
    // unregister
    // destroy tree
  }

  private assembleWidgetTree(
    widgetNames: string[],
    parentWidget: ShukunWidget,
    container: PlayerContainer,
  ) {
    widgetNames.forEach((name) => {
      const schema = container.widgets[name];
      const WidgetClass = this.configManager.getWidgetClass(schema.tag);
      const widget = this.mountWidget(container, schema, WidgetClass);
      parentWidget.append(widget);

      const nextWidgetNames = container.tree[name] ?? [];
      if (nextWidgetNames.length === 0) {
        return;
      }
      this.assembleWidgetTree(nextWidgetNames, widget, container);
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
