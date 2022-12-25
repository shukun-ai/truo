import { QueryEntity } from '@datorama/akita';
import { FlowSchema } from '@shukun/schema';
import { cloneDeep } from 'lodash';

import { FlowState } from './store';

export class FlowQuery extends QueryEntity<FlowState> {
  allFlows$ = this.selectAll();

  activeFlow$ = this.selectActive();

  getCloneActiveFlow() {
    const active = this.getActive();
    if (!active) {
      throw new Error();
    }
    return cloneDeep(active);
  }

  existEvent(flow: FlowSchema, eventName: string): boolean {
    return !!flow.events[eventName];
  }
}
