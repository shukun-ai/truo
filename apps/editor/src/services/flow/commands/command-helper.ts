import { FlowEvent, FlowSchema } from '@shukun/schema';

import { TypeException } from '../../../exceptions/type-exception';

export class FlowCommandHelper {
  insertStartEvent(
    flow: FlowSchema,
    nextEventName: string,
    nextEvent: FlowEvent,
  ) {
    this.insertEvent(flow, nextEventName, nextEvent);
    flow.startEventName = nextEventName;
  }

  insertNextEvent(
    flow: FlowSchema,
    nextEventName: string,
    nextEvent: FlowEvent,
    previousEventName: string,
  ) {
    const previousEvent = this.findPreviousEvent(flow, previousEventName);
    this.insertEvent(flow, nextEventName, nextEvent);
    this.updatePreviousEventNext(previousEvent, nextEventName);
  }

  updatePreviousEventNext(previousEvent: FlowEvent, nextEventName: string) {
    switch (previousEvent.type) {
      case 'Choice':
      case 'Parallel':
      case 'Success':
      case 'Fail':
        throw new Error('wait');
      default:
        previousEvent.next = nextEventName;
    }
  }

  insertEvent(flow: FlowSchema, nextEventName: string, nextEvent: FlowEvent) {
    if (flow.events[nextEventName]) {
      throw new TypeException('The Event Name is used: {{nextEventName}}', {
        nextEventName,
      });
    }

    flow.events[nextEventName] = nextEvent;
  }

  findPreviousEvent(flow: FlowSchema, previousEventName: string) {
    const { events } = flow;

    const event = events[previousEventName];

    if (!event) {
      throw new TypeException(
        'We did not find this event: {{previousEventName}}',
        { previousEventName },
      );
    }

    return event;
  }
}
