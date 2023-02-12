import { PlayerPageElement } from '@shukun/schema';

export class UiElement {
  private ref: HTMLElement;

  constructor(
    private readonly elementName: string,
    private readonly lowCodeElement: PlayerPageElement,
  ) {
    this.ref = document.createElement(this.lowCodeElement.element);
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
}
