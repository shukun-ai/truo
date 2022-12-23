import { Query } from '@datorama/akita';

import { FlowUIState } from './store';

export class FlowUIQuery extends Query<FlowUIState> {
  insertModalVisible$ = this.select((state) => state.insertModalVisible);

  editingModalVisible$ = this.select((state) => !!state.editingEventName);

  editingEvent$ = this.select((state) => state.editingEvent);

  editingEventName$ = this.select((state) => state.editingEventName);
}
