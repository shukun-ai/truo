import { Text } from '@mantine/core';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';

export type TabLabelProps = {
  tab: PresenterTabEntity;
};

export const TabLabel = ({ tab }: TabLabelProps) => {
  return (
    <Text fs={tab.isPreview ? 'italic' : undefined}>
      {tab.tabType === 'widget' ? tab.widgetName : 'other'}
    </Text>
  );
};
