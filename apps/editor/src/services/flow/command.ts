import { FlowEvent, FlowSchema } from '@shukun/schema';

import { TypeException } from '../../exceptions/type-exception';

import { FlowCommandInsert } from './commands/command-insert';

import { FlowStore } from './store';

export class FlowCommand {
  constructor(
    private readonly store: FlowStore,
    private readonly flowCommandInsert: FlowCommandInsert,
  ) {}

  setAll(flows: Record<string, FlowSchema>) {
    this.store.set({ ids: Object.keys(flows), entities: flows });
  }

  insert(
    flow: FlowSchema,
    nextEventName: string,
    nextEvent: FlowEvent,
    previousEventName: string | null,
  ) {
    this.flowCommandInsert.insertEvent(
      flow,
      nextEventName,
      nextEvent,
      previousEventName,
    );

    this.store.update(flow.name, flow);
  }

  insertSimple(flow: FlowSchema, eventName: string, event: FlowEvent) {
    if (flow.events[eventName]) {
      throw new TypeException('Did not save duplicate: {{eventName}}', {
        eventName,
      });
    }
    // TODO use avj to validate the input.
    flow.events[eventName] = event;
    this.store.update(flow.name, flow);
  }

  remove(flow: FlowSchema, eventName: string) {
    if (!flow.events[eventName]) {
      throw new TypeException('Did not find event when remove: {{eventName}}', {
        eventName,
      });
    }

    const result = delete flow.events[eventName];

    if (!result) {
      throw new TypeException('Can not remove event: {{eventName}}', {
        eventName,
      });
    }

    this.store.update(flow.name, flow);
  }

  update(flow: FlowSchema, eventName: string, event: FlowEvent) {
    if (!flow.events[eventName]) {
      throw new TypeException('Did not find event when update: {{eventName}}', {
        eventName,
      });
    }

    flow.events[eventName] = { ...flow.events[eventName], ...event };

    this.store.update(flow.name, flow);
  }

  updateStartEventName(flow: FlowSchema, startEventName: string) {
    if (!flow.events[startEventName]) {
      throw new TypeException(
        'Did not find event when update start event name: {{startEventName}}',
        {
          startEventName,
        },
      );
    }

    flow.startEventName = startEventName;

    this.store.update(flow.name, flow);
  }
}
