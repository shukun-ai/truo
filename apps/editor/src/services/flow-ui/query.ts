import { Query } from '@datorama/akita';

import { FlowUIState } from './store';

export class FlowUIQuery extends Query<FlowUIState> {
  insertModalVisible$ = this.select((state) => state.insertModalVisible);
}
