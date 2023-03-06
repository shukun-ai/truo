import { PlayerRepository } from '@shukun/schema';

import { SimpleRepository } from '../controller/repositories/simple-repository';

import { IRepositoryManager } from '../repository/repository-manager.interface';

export class CustomRepositoryService {
  constructor(private readonly repositoryManager: IRepositoryManager) {}

  public register(repositorySchemas: Record<string, PlayerRepository>): void {
    for (const [key, schema] of Object.entries(repositorySchemas)) {
      switch (schema.type) {
        case 'Simple':
          this.repositoryManager.add(key, new SimpleRepository(schema));
          break;
      }
    }
  }

  public unregister(repositorySchemas: Record<string, PlayerRepository>): void {
    for (const name of Object.keys(repositorySchemas)) {
      this.repositoryManager.get(name)?.destroy();
      this.repositoryManager.remove(name);
    }
  }
}
