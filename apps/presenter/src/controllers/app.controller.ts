import { createElement } from 'react';

import { Injector } from '../injector';
import { ConfigDefinitions } from '../loaders/config-manager.interface';

import { AssembledApp } from './app-assemble';

export class AppController {
  private CURRENT_USER_REPOSITORY_KEY = 'currentUser';
  private ROUTER_REPOSITORY_KEY = 'router';

  private definitions?: ConfigDefinitions;

  constructor(private readonly injector: Injector) {}

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

    this.injector.customRepositoryService.register(
      this.definitions.player.containers['home'].repositories,
    );
  }
}
