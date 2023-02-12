import { TypeException } from '@shukun/exception';
import { PlayerPage, PlayerSchema } from '@shukun/schema';

export class LowCodeRegister {
  private playerSchema?: PlayerSchema;

  constructor() {
    //
  }

  async initialize() {
    this.playerSchema = await this.load();
  }

  getPage(pageName: string): PlayerPage {
    const page = this.playerSchema?.pages?.[pageName];
    if (!page) {
      throw new TypeException('Did not find page.');
    }
    return page;
  }

  private async load(): Promise<PlayerSchema> {
    return {
      shares: {},
      requests: {},
      pages: {
        home: {
          elements: {
            e1: {
              element: 'sk-text',
              inputs: {
                title: 'Hello {{e2.value}}',
              },
            },
            e2: {
              element: 'sk-input',
            },
            e3: {
              element: 'sk-layout',
            },
          },
          root: ['e3'],
          tree: {
            e3: ['e1', 'e2'],
          },
        },
      },
    };
  }
}
