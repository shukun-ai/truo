import { IStorageManager, IStore } from '@shukun/widget';
import { tap } from 'rxjs';

import {
  getAuthStorage,
  requesterSessionPayload,
  setAuthStorage,
} from './auth-storage';

export class StorageManager implements IStorageManager {
  constructor(private readonly store: IStore) {}

  register(): void {
    this.registerAuthStorage();
  }

  private registerAuthStorage(): void {
    this.store.update(
      {
        type: 'app',
        containerId: null,
        repositoryId: 'auth',
      },
      [],
      () => {
        return getAuthStorage();
      },
    );

    this.store
      .query(
        {
          type: 'app',
          containerId: null,
          repositoryId: 'auth',
        },
        [],
      )
      .pipe(
        tap((value) => {
          setAuthStorage(value as unknown as requesterSessionPayload);
        }),
      )
      .subscribe();
  }
}
