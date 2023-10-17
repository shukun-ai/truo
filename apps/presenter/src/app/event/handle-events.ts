import { Injector, Repository } from '@shukun/presenter/definition';
import { PresenterEvent, PresenterSchema } from '@shukun/schema';

import { StandardState } from '../../interfaces/app';

export const handleEvent = (
  event: PresenterEvent,
  state: StandardState,
  injector: Injector,
  presenter: PresenterSchema,
  repositories: Record<string, Repository>,
): void => {
  console.log('handled event');
};
