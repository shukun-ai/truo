import { Query } from '@datorama/akita';

import { CustomModalState, CustomModalStore } from './store';

export class CustomModalQuery extends Query<CustomModalState> {
  label$ = this.select((state) => state.label);

  visible$ = this.select((state) => state.visible);

  url$ = this.select((state) => state.url);

  search$ = this.select((state) => state.search);

  sources$ = this.select((state) => state.sources);

  view$ = this.select((state) => state.view);

  metadata$ = this.select((state) => state.metadata);

  constructor(protected readonly customModalStore: CustomModalStore) {
    super(customModalStore);
  }
}
