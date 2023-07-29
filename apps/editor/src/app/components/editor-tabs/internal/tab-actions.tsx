import { ActionIcon } from '@mantine/core';
import { IconPin, IconPinnedFilled, IconX } from '@tabler/icons-react';

import { EditorTabItem } from './type';

export type TabActionsProps = {
  tab: EditorTabItem;
  fixTab(tabItemId: string): void;
  closeTab(tabItemId: string): void;
};

export const TabActions = ({ tab, fixTab, closeTab }: TabActionsProps) => {
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
            fixTab(tab.id);
          }}
        >
          <IconPin size="0.75rem" />
        </ActionIcon>
      )}
      <ActionIcon
        component="span"
        onClick={(event) => {
          event.stopPropagation();
          closeTab(tab.id);
        }}
      >
        <IconX size="0.75rem" />
      </ActionIcon>
    </>
  );
};
