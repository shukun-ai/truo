import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';

import { SettingWidget } from './setting-widget';

export type SettingDetailProps = {
  tab: PresenterTabEntity;
};

export const SettingDetail = ({ tab }: SettingDetailProps) => {
  if (tab.tabType === 'widget') {
    return <SettingWidget tab={tab} />;
  }
  return null;
};
