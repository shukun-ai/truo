import { Text } from '@mantine/core';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';

export type SettingTabLabelProps = {
  tab: PresenterTabEntity;
};

export const SettingTabLabel = ({ tab }: SettingTabLabelProps) => {
  return (
    <Text fs={tab.isPreview ? 'italic' : undefined}>
      {tab.tabType === 'widget' ? tab.widgetId : 'other'}
    </Text>
  );
};
