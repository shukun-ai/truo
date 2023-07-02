import { Observable } from 'rxjs';

import { PresenterWatchEntity } from './watch-ref';

export interface IWatchRepository {
  all$: Observable<PresenterWatchEntity[]>;
  isUniqueWatchName(containerName: string, watchName: string): boolean;
  create(entity: Omit<PresenterWatchEntity, 'id'>): void;
  update(entityId: string, entity: Omit<PresenterWatchEntity, 'id'>): void;
  remove(entityId: string): void;
  getByWatchName(
    containerName: string,
    watchName: string,
  ): PresenterWatchEntity | null;
}
