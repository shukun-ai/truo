import { PresenterEvent } from '@shukun/schema';

import { IRepository } from './repository.interface';

export type AsyncState = {
  loading: boolean;
  errorMessage: string | null;
  data: Record<string, unknown>;
};

export interface IAsyncRepository extends IRepository {
  run(event: PresenterEvent, payload: unknown): Promise<void>;
}
