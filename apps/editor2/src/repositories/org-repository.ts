import { select } from '@ngneat/elf';

import { ApiRequester } from '../apis/requester';

import { OrgStore } from './org-store';

export class OrgRepository {
  currentOrg$ = this.orgStore.pipe(select((state) => state.currentOrg));

  constructor(
    private readonly orgStore: OrgStore,
    private readonly apiRequester: ApiRequester,
  ) {}
}
