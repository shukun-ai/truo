import { createElement } from 'react';

import { Injector } from '../injector';
import { ConfigDefinitions } from '../loaders/config-manager.interface';

import { AssembledApp } from './app-asemble';

export class AppController {
  private definitions?: ConfigDefinitions;

  constructor(private readonly injector: Injector) {}

  async registerRepositories() {
    this.definitions = await this.injector.loader.load('pactl', 'pda');
  }

  async assembleWidgets() {
    if (!this.definitions?.player) {
      throw new Error();
    }

    return createElement(
      AssembledApp,
      {
        player: this.definitions.player,
        widgets: this.definitions.reactWidgets,
      },
      'hi',
    );
  }
}
