import { createElement } from 'react';

import { Injector } from '../injector';
import { ConfigDefinitions } from '../loaders/config-manager.interface';

import { AssembledApp } from './app-asemble';
import { CustomRepositoryService } from './custom-repository-service';

export class AppController {
  private CURRENT_USER_REPOSITORY_KEY = 'currentUser';
  private ROUTER_REPOSITORY_KEY = 'router';

  private definitions?: ConfigDefinitions;

  private customRepositoryService: CustomRepositoryService;

  constructor(private readonly injector: Injector) {
    this.customRepositoryService = new CustomRepositoryService(
      this.injector.repositoryManager,
    );
  }

  async registerRepositories() {
    this.definitions = await this.injector.loader.load('pactl', 'pda');

    this.injector.repositoryManager.add(
      this.ROUTER_REPOSITORY_KEY,
      this.injector.routerRepository,
    );
    this.injector.repositoryManager.add(
      this.CURRENT_USER_REPOSITORY_KEY,
      this.injector.currentUserRepository,
    );

    this.customRepositoryService.register(
      this.definitions.player.containers['home'].repositories,
    );
  }

  async assembleWidgets() {
    if (!this.definitions?.player) {
      throw new Error();
    }

    return createElement(AssembledApp, {
      player: this.definitions.player,
      widgets: this.definitions.reactWidgets,
      repositoryManager: this.injector.repositoryManager,
    });
  }
}
