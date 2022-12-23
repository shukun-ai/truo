import { QueryEntity } from '@datorama/akita';
import { FlowSchema } from '@shukun/schema';
import { cloneDeep } from 'lodash';

import { FlowState } from './store';

export class FlowQuery extends QueryEntity<FlowState> {
  flows$ = this.selectAll();

  // TODO mock
  // activeFlow$ = this.selectActive();
  activeFlow$ = this.selectEntity('retrieve_receive_tasks');

  getActiveFlow(): FlowSchema | null {
    const entity = this.getActive();
    return entity ?? null;
  }

  getFlow(flowName: string): FlowSchema {
    const entity = this.getEntity(flowName);
    if (!entity) {
      throw new Error();
    }
    return entity;
  }

  getCloneFlow(flowName: string): FlowSchema {
    return cloneDeep(this.getFlow(flowName));
  }

  existEvent(flow: FlowSchema, eventName: string): boolean {
    return !!flow.events[eventName];
  }
}
