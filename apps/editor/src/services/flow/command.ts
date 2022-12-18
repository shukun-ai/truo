import { FlowEvent, FlowSchema } from '@shukun/schema';

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
}
