import { PlayerContainer, PlayerWidget } from '@shukun/schema';
import { distinctUntilChanged, map, Subscription } from 'rxjs';

import { ConfigManager } from '../config/config-manager';
import { RepositoryManager } from '../repository/repository-manager';
import { TemplateService } from '../template/template.service';

export class PageController {
  constructor(
    private readonly configManager: ConfigManager,
    private readonly repositoryManager: RepositoryManager,
    private readonly templateService: TemplateService,
  ) {}

  private subscriptions = new Map<string, Subscription>();

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
      const widget = this.mountWidget(schema);
      parentWidget.append(widget);

      const nextWidgetNames = container.tree[name] ?? [];
      if (nextWidgetNames.length === 0) {
        return;
      }
      this.assembleWidgetTree(nextWidgetNames, widget, container);
    });
  }

  private mountWidget(schema: PlayerWidget) {
    const widget = document.createElement(schema.tag);
    // subscribe repository
    for (const [state, template] of Object.entries(schema.states)) {
      const subscription = this.createSubscription(widget, state, template);
      this.subscriptions.set(`${schema.tag}:${state}`, subscription);
    }

    // this.templateService.parse()
    // this.repositoryManager.subscribe()
    // listen event emit
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
    const identifiers = new Set<string>();
    literal.codes.forEach((code) =>
      code.identifiers.forEach((identifier) => identifiers.add(identifier)),
    );

    return this.repositoryManager
      .subscribe([...identifiers])
      .pipe(
        map((dependencies) => {
          const executedCodes = literal.codes.map((code) => {
            return this.templateService.execute(
              code,
              dependencies as unknown[],
            );
          });
          const result = this.templateService.evaluate(literal, executedCodes);
          return result;
        }),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        widget.setAttribute(state, value as any);
      });
  }
}
