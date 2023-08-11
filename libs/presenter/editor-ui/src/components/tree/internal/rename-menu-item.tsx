import { Menu } from '@mantine/core';
import { modals } from '@mantine/modals';

import { notifications } from '@mantine/notifications';
import { Icon } from '@shukun/component';
import { useCallback } from 'react';

export type RenameMenuItemProps = {
  widgetEntity: PresenterWidgetEntity;
};

export const RenameMenuItem = ({ widgetEntity }: RenameMenuItemProps) => {
  const app = useAppContext();
  const openModal = useCallback(() => {
    modals.open({
      title: '重命名',
      children: (
        <RenameForm
          initialValues={{ label: widgetEntity.label }}
          onSubmit={(newValue) => {
            if (newValue.label === widgetEntity.label) {
              modals.closeAll();
              return;
            }
            try {
              app.repositories.presenterRepository.widgetRepository.rename(
                widgetEntity.id,
                widgetEntity.containerName,
                newValue.label,
              );
              modals.closeAll();
            } catch {
              notifications.show({
                message: '该名称已存在',
                color: 'red',
              });
            }
          }}
        />
      ),
    });
  }, [
    app.repositories.presenterRepository.widgetRepository,
    widgetEntity.containerName,
    widgetEntity.id,
    widgetEntity.label,
  ]);

  return (
    <Menu.Item icon={<Icon type="rename" size={14} />} onClick={openModal}>
      重命名
    </Menu.Item>
  );
};
