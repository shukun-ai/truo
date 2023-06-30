import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';

import { TabWidget } from './tab-widget';

export type TabDetailProps = {
  tab: PresenterTabEntity;
};

export const TabDetail = ({ tab }: TabDetailProps) => {
  if (tab.tabType === 'widget') {
    return <TabWidget tab={tab} />;
  }
  return null;
};
