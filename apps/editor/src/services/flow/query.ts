import { QueryEntity } from '@datorama/akita';

import { FlowState } from './store';

export class FlowQuery extends QueryEntity<FlowState> {
  flows$ = this.selectAll();

  activeFlow$ = this.selectActive();
}
