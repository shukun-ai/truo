import { Query } from '@datorama/akita';

import { CustomModalState, CustomModalStore } from './store';

export class CustomModalQuery extends Query<CustomModalState> {
  label$ = this.select((state) => state.label);

  visible$ = this.select((state) => state.visible);

  url$ = this.select((state) => state.url);

  sources$ = this.select((state) => state.sources);

  constructor(protected readonly customModalStore: CustomModalStore) {
    super(customModalStore);
  }
}
