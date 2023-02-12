import { UiElement } from './ui-element';

export class RootManager {
  root: HTMLElement;

  constructor() {
    const root = document.getElementById('root');
    if (!root) {
      throw new Error();
    }
    this.root = root;
  }

  append(uiElement: UiElement) {
    this.root.append(uiElement.getRef());
  }
}
