import { ActionIcon } from '@mantine/core';
import { IconPin, IconPinnedFilled, IconX } from '@tabler/icons-react';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';

export type TabActionsProps = {
  tab: PresenterTabEntity;
};

export const TabActions = ({ tab }: TabActionsProps) => {
  const app = useAppContext();

  return (
    <>
      {!tab.isPreview && (
        <ActionIcon component="span">
          <IconPinnedFilled size="0.75rem" />
        </ActionIcon>
      )}
      {tab.isPreview && (
        <ActionIcon
          component="span"
          onClick={(event) => {
            event.stopPropagation();
            app.repositories.presenterRepository.tabRepository.fixTab(tab.id);
          }}
        >
          <IconPin size="0.75rem" />
        </ActionIcon>
      )}
      <ActionIcon
        component="span"
        onClick={(event) => {
          event.stopPropagation();
          app.repositories.presenterRepository.tabRepository.closeTab(tab.id);
        }}
      >
        <IconX size="0.75rem" />
      </ActionIcon>
    </>
  );
};
