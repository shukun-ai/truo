import { FlowEvent, FlowSchema } from '@shukun/schema';

import { TypeException } from '../../../exceptions/type-exception';

export class FlowCommandHelper {
  insertStartEvent(
    flow: FlowSchema,
    newEventName: string,
    newEvent: FlowEvent,
  ) {
    newEvent = this.updateNewEventNext(newEvent, null);
    this.insertEvent(flow, newEventName, newEvent);
    flow.startEventName = newEventName;
  }

  insertNextEvent(
    flow: FlowSchema,
    newEventName: string,
    newEvent: FlowEvent,
    previousEventName: string,
  ) {
    const previousEvent = this.findPreviousEvent(flow, previousEventName);
    newEvent = this.updateNewEventNext(newEvent, previousEvent);
    this.insertEvent(flow, newEventName, newEvent);
    this.updatePreviousEventNext(previousEvent, newEventName);
  }

  updatePreviousEventNext(previousEvent: FlowEvent, newEventName: string) {
    switch (previousEvent.type) {
      case 'Choice':
      case 'Parallel':
      case 'Success':
      case 'Fail':
        throw new Error('wait');
      default:
        previousEvent.next = newEventName;
    }
  }

  updateNewEventNext(
    newEvent: FlowEvent,
    previousEvent: FlowEvent | null,
  ): FlowEvent {
    if (!previousEvent) {
      return newEvent;
    }
    switch (previousEvent.type) {
      case 'Choice':
      case 'Parallel':
      case 'Success':
      case 'Fail':
        throw new Error('wait');
      default:
        return {
          ...newEvent,
          next: previousEvent.next,
        };
    }
  }

  insertEvent(flow: FlowSchema, newEventName: string, newEvent: FlowEvent) {
    if (flow.events[newEventName]) {
      throw new TypeException('The Event Name is used: {{newEventName}}', {
        newEventName,
      });
    }

    flow.events[newEventName] = newEvent;
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
