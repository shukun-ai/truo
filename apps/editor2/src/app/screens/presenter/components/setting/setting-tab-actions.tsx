import { ActionIcon } from '@mantine/core';
import { IconPin, IconX } from '@tabler/icons-react';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';

export type SettingTabActionsProps = {
  tab: PresenterTabEntity;
};

export const SettingTabActions = ({ tab }: SettingTabActionsProps) => {
  const app = useAppContext();

  return (
    <>
      <ActionIcon
        component="span"
        onClick={() => {
          app.repositories.presenterRepository.tabRepository.fixTab(tab.id);
        }}
      >
        <IconPin size="0.75rem" />
      </ActionIcon>
      <ActionIcon
        component="span"
        onClick={() => {
          app.repositories.presenterRepository.tabRepository.closeTab(tab.id);
        }}
      >
        <IconX size="0.75rem" />
      </ActionIcon>
    </>
  );
};
