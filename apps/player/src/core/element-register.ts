import { TypeException } from '@shukun/exception';
import { ElementSchema } from '@shukun/schema';

import { Layout } from '../components/layout';

import { Text } from '../components/text';

export class ElementRegister {
  jsonDefinitions?: Record<string, ElementSchema>;

  customElements?: Record<string, any>;

  public async initialize() {
    await this.load();
    this.registerCustomELements();
  }

  public getDefinition(elementName: string) {
    const definition = this.jsonDefinitions?.[elementName];
    if (!definition) {
      throw new TypeException('Did not find element definition.');
    }
    return definition;
  }

  private async load() {
    this.jsonDefinitions = {
      'sk-text': {
        name: 'text',
        vendor: 'sk',
        input: [
          {
            name: 'title',
            label: 'Title',
            section: 'general',
            type: 'expression',
          },
        ],
        output: [],
      },
      'sk-layout': {
        name: 'layout',
        vendor: 'sk',
        input: [],
        output: [],
      },
    };
    this.customElements = {
      'sk-text': Text,
      'sk-layout': Layout,
    };
  }

  private registerCustomELements() {
    if (!this.customElements) {
      throw new TypeException('Please initialize first.');
    }

    for (const [elementName, customElement] of Object.entries(
      this.customElements,
    )) {
      customElements.define(elementName, customElement);
    }
  }
}
