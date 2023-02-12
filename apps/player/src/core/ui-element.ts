import { PlayerPageElement } from '@shukun/schema';
import { map, Subscription, tap } from 'rxjs';

import { StoreRegister } from './store-register';
import { TemplateParser } from './template-parser';

export class UiElement {
  private ref: HTMLElement;

  private subscriptions: Map<string, Subscription> = new Map();

  constructor(
    private readonly elementName: string,
    private readonly lowCodeElement: PlayerPageElement,
    private readonly storeRegister: StoreRegister,
  ) {
    this.ref = document.createElement(this.lowCodeElement.element);
    if (lowCodeElement.inputs) {
      this.createSelectors(lowCodeElement.inputs);
    }
  }

  getRef() {
    return this.ref;
  }

  setId(id: string) {
    this.ref.id = id;
  }

  append(uiElement: UiElement) {
    this.ref.append(uiElement.ref);
  }

  private createSelectors(inputs: NonNullable<PlayerPageElement['inputs']>) {
    for (const [key, binding] of Object.entries(inputs)) {
      this.createSubscription(key, binding);
    }
  }

  private createSubscription(keyName: string, binding: string) {
    const templateParser = new TemplateParser();

    const templateLiteral = templateParser.parse(binding);
    const watched = templateLiteral.variables.map((variable) => variable.name);

    const subscription = this.storeRegister
      .createSelector(watched)
      .pipe(
        map((changed) => {
          return templateParser.evaluate(templateLiteral, changed);
        }),
        tap((value) => {
          this.ref.setAttribute(keyName, value);
        }),
      )
      .subscribe();
    this.subscriptions.set(keyName, subscription);
  }
}
