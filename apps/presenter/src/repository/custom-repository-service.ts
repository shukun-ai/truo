import { PlayerRepository, PlayerSchema } from '@shukun/schema';

import { SimpleRepository } from '../repositories/simple-repository';

import { IRepositoryManager } from '../repository/repository-manager.interface';

export class CustomRepositoryService {
  constructor(private readonly repositoryManager: IRepositoryManager) {}

  public registerAll(playerDefinitions: PlayerSchema) {
    for (const [containerId, container] of Object.entries(
      playerDefinitions.containers,
    )) {
      this.register(containerId, container.repositories);
    }
  }

  public unregisterAll(playerDefinitions: PlayerSchema) {
    for (const [containerId, container] of Object.entries(
      playerDefinitions.containers,
    )) {
      this.unregister(containerId, container.repositories);
    }
  }

  private register(
    containerId: string,
    repositorySchemas: Record<string, PlayerRepository>,
  ): void {
    for (const [name, schema] of Object.entries(repositorySchemas)) {
      const repositoryId = `${containerId}:${name}`;
      switch (schema.type) {
        case 'Simple':
          this.repositoryManager.add(
            repositoryId,
            new SimpleRepository(schema),
          );
          break;
      }
    }
  }

  private unregister(
    containerId: string,
    repositorySchemas: Record<string, PlayerRepository>,
  ): void {
    for (const name of Object.keys(repositorySchemas)) {
      const repositoryId = `${containerId}:${name}`;
      this.repositoryManager.get(repositoryId)?.destroy();
      this.repositoryManager.remove(repositoryId);
    }
  }
}
