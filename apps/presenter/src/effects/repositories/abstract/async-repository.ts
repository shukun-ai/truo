import { PresenterEvent } from '@shukun/schema';
import { AsyncState, IAsyncRepository } from '@shukun/widget';

import { BaseRepository } from './base-repository';

export abstract class AsyncRepository
  extends BaseRepository<AsyncState>
  implements IAsyncRepository
{
  run(event: PresenterEvent, payload: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
