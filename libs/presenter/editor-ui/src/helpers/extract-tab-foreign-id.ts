import { TabEntity } from '../editor-context';

export const extractTabForeignId = (
  tab: TabEntity | null,
  tabType: TabEntity['tabType'],
) => {
  if (!tab) {
    return null;
  }

  if (tab.tabType !== tabType) {
    return null;
  }

  return tab.foreignId;
};
