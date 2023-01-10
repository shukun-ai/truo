import { TypeException } from '@shukun/exception';
import { FlowEvent, FlowSchema } from '@shukun/schema';

import { FlowStore } from './store';

export class FlowCommand {
  constructor(private readonly store: FlowStore) {}

  setAll(flows: Record<string, FlowSchema>) {
    this.store.set({ ids: Object.keys(flows), entities: flows });
  }

  setActive(flowName: string) {
    this.store.setActive(flowName);
  }

  removeActive(flowName: string) {
    this.store.removeActive(flowName);
  }

  createFlow(flowName: string) {
    const flow: FlowSchema = {
      name: flowName,
      input: {},
      output: {},
      startEventName: 'return',
      events: {
        return: {
          type: 'Success',
          output: '',
        },
      },
    };
    this.store.add(flow);
  }

  insertEvent(flow: FlowSchema, eventName: string, event: FlowEvent) {
    if (flow.events[eventName]) {
      throw new TypeException('Did not save duplicate: {{eventName}}', {
        eventName,
      });
    }
    // TODO use avj to validate the input.
    flow.events[eventName] = event;
    this.store.update(flow.name, flow);
  }

  removeEvent(flow: FlowSchema, eventName: string) {
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

  updateEvent(flow: FlowSchema, eventName: string, event: FlowEvent) {
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
