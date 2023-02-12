import { PlayerPage } from '@shukun/schema';

import { StoreRegister } from './store-register';
import { UiElement } from './ui-element';

export class Page {
  private pageRef!: UiElement;

  constructor(
    private readonly pageName: string,
    private readonly storeRegister: StoreRegister,
    private readonly playerPage: PlayerPage,
  ) {
    this.storeRegister.createPageStore(this.pageName);
  }

  create() {
    this.pageRef = this.createPageElement();
    this.pageRef.setId(`page-${this.pageName}`);
    return this.pageRef;
  }

  private createPageElement() {
    return new UiElement('sk-page', { element: 'sk-page' });
  }

  mount() {
    const root = this.playerPage.root ?? [];
    this.appendChildren(root, this.pageRef);
  }

  appendChildren(childrenNames: string[], parentUiElement: UiElement): void {
    childrenNames.forEach((childName) => {
      const uiElement = this.createUiElement(childName);
      parentUiElement.append(uiElement);

      const nextChildrenNames = this.playerPage.tree[childName];
      if (!nextChildrenNames) {
        return;
      }
      this.appendChildren(nextChildrenNames, uiElement);
    });
  }

  createUiElement(elementName: string): UiElement {
    const playerPageElement = this.playerPage.elements[elementName];
    if (!playerPageElement) {
      throw new Error();
    }
    return new UiElement(elementName, playerPageElement);
  }

  unmount() {
    //
  }
}
