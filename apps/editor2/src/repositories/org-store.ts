import { createStore, withProps, Store, StoreDef } from '@ngneat/elf';
import { SystemPublicOrgModel } from '@shukun/schema';

export type OrgProps = {
  currentOrg: SystemPublicOrgModel | null;
};

export type OrgStore = Store<StoreDef<OrgProps>, OrgProps>;

export const orgStore: OrgStore = createStore(
  { name: 'org' },
  withProps<OrgProps>({ currentOrg: null }),
);
