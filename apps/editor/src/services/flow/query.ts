import { QueryEntity } from '@datorama/akita';
import { FlowSchema } from '@shukun/schema';

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
}
