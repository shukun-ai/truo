import { FlowEvent, FlowSchema } from '@shukun/schema';

import { FlowCommandHelper } from './command-helper';

export class FlowCommandInsert {
  constructor(private readonly flowCommandHelper: FlowCommandHelper) {}

  insertEvent(
    flow: FlowSchema,
    nextEventName: string,
    nextEvent: FlowEvent,
    previousEventName: string | null,
  ) {
    if (!previousEventName) {
      return this.flowCommandHelper.insertStartEvent(
        flow,
        nextEventName,
        nextEvent,
      );
    } else {
      return this.flowCommandHelper.insertNextEvent(
        flow,
        nextEventName,
        nextEvent,
        previousEventName,
      );
    }
  }
}
