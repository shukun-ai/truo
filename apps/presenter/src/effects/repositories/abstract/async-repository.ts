import { PresenterEvent } from '@shukun/schema';
import { AsyncState, IAsyncRepository } from '@shukun/widget';

import { ContainerRepository } from './container-repository';

export class AsyncRepository
  extends ContainerRepository<AsyncState>
  implements IAsyncRepository
{
  run(event: PresenterEvent, payload: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
