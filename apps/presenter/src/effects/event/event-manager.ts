import { PresenterEvent } from '@shukun/schema';
import {
  EventManagerContext,
  EventManagerState,
  IEventManager,
} from '@shukun/widget';

import { handleEvent } from './event-handler';

export class EventManager implements IEventManager {
  constructor(private readonly context: EventManagerContext) {}

  handleEvents(events: PresenterEvent[], state: EventManagerState) {
    events.forEach((event) => {
      handleEvent(event, this.context, state);
    });
  }
}
