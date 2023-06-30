import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';

import { TabRepository } from './tab-repository';

import { TabWidget } from './tab-widget';

export type TabDetailProps = {
  tab: PresenterTabEntity;
};

export const TabDetail = ({ tab }: TabDetailProps) => {
  if (tab.tabType === 'widget') {
    return <TabWidget tab={tab} />;
  }
  if (tab.tabType === 'repository') {
    return <TabRepository tab={tab} />;
  }
  return null;
};
