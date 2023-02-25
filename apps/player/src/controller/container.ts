import { TypeException } from '@shukun/exception';
import { PlayerContainer, PlayerWidget } from '@shukun/schema';
import { ShukunWidget, ShukunWidgetClass } from '@shukun/widget';
import { combineLatest, distinctUntilChanged, map, Subscription } from 'rxjs';

import { IConfigManager } from '../config/config-manager.interface';
import { IEventQueue } from '../event/event-queue.interface';

import { IRepositoryManager } from '../repository/repository-manager.interface';
import { ITemplateService } from '../template/template-service.interface';

import { CustomRepositoryService } from './custom-repository-service';

export class Container {
  private subscriptions = new Map<string, Subscription>();
  private listeners = new Set<string>();
  private currentWidgets = new Map<string, ShukunWidget>();
  private containerWidget: ShukunWidget | null = null;
  private containerDefinition: PlayerContainer | null = null;

  constructor(
    private readonly configManager: IConfigManager,
    private readonly repositoryManager: IRepositoryManager,
    private readonly eventQueue: IEventQueue,
    private readonly templateService: ITemplateService,
    private readonly customRepositoryService: CustomRepositoryService,
  ) {}

  public mount(containerName: string) {
    const ContainerWidget = this.configManager.getWidgetClass('sk-container');
    const containerWidget = new ContainerWidget();
    const containerDefinition = this.configManager.getContainer(containerName);
    this.customRepositoryService.register(containerDefinition.repositories);

    this.assembleWidgetTree(
      containerDefinition.root,
      containerWidget,
      containerDefinition,
    );
    console.log(this.currentWidgets);
    this.containerWidget = containerWidget;
    this.containerDefinition = containerDefinition;
  }

  public umount() {
    const containerWidget = this.getContainerWidget();
    for (const [, widget] of this.currentWidgets) {
      widget.beforeUnmount();
    }
    for (const [, subscription] of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.listeners.clear();
    for (const [, widget] of this.currentWidgets) {
      containerWidget.getHTMLElement().removeChild(widget.getHTMLElement());
    }
    this.currentWidgets.clear();
    const containerDefinition = this.getContainerDefinition();
    this.customRepositoryService.unregister(containerDefinition.repositories);
  }

  public getContainerWidget() {
    const containerWidget = this.containerWidget;
    if (!containerWidget) {
      throw new TypeException('The container widget is not defined.');
    }
    return containerWidget;
  }

  public getContainerDefinition() {
    const containerDefinition = this.containerDefinition;
    if (!containerDefinition) {
      throw new TypeException('The container widget is not defined.');
    }
    return containerDefinition;
  }

  private addWidget(widgetInstanceName: string, widget: ShukunWidget) {
    if (this.currentWidgets.has(widgetInstanceName)) {
      throw new TypeException('The widget is added: {{widgetInstanceName}}', {
        widgetInstanceName,
      });
    }
    this.currentWidgets.set(widgetInstanceName, widget);
  }

  private assembleWidgetTree(
    widgetNames: string[],
    parentWidget: ShukunWidget,
    containerDefinition: PlayerContainer,
  ) {
    widgetNames.forEach((name) => {
      const schema = containerDefinition.widgets[name];
      const WidgetClass = this.configManager.getWidgetClass(schema.tag);
      const widget = this.mountWidget(containerDefinition, schema, WidgetClass);
      widget.setIdentifier(name);
      parentWidget.append(widget);
      // this.addWidget(name, widget);
      this.currentWidgets.set(name, widget);

      const nextWidgetNames = containerDefinition.tree[name] ?? [];
      if (nextWidgetNames.length === 0) {
        return;
      }
      this.assembleWidgetTree(nextWidgetNames, widget, containerDefinition);
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
  ): void {
    widget.listen(eventName, (payload) => {
      behaviors.forEach((behavior) => {
        const eventBehavior = container.events[behavior];
        this.eventQueue.emit(eventBehavior, payload);
      });
    });
  }
}
