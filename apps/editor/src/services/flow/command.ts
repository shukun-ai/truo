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
}
