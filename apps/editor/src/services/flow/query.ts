import { QueryEntity } from '@datorama/akita';

import { FlowState } from './store';

export class FlowQuery extends QueryEntity<FlowState> {
  flows$ = this.selectAll();

  // TODO mock
  // activeFlow$ = this.selectActive();
  activeFlow$ = this.selectEntity('retrieve_receive_tasks');
}
