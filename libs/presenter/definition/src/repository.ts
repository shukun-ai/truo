import { PresenterEvent, PresenterRepository } from '@shukun/schema';

import { Injector } from './injector';

export type Repository = {
  [actionName: string]: (
    payload: unknown,
    event: PresenterEvent,
    injector: Injector,
    repository: PresenterRepository,
  ) => void;
};
