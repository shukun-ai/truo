import { Menu } from '@mantine/core';
import { modals } from '@mantine/modals';

import { notifications } from '@mantine/notifications';
import { Icon, RenameForm } from '@shukun/component';
import { useCallback } from 'react';

import { WidgetEntity, useEditorContext } from '../../../editor-context';

export type RenameMenuItemProps = {
  widgetEntity: WidgetEntity;
};

export const RenameMenuItem = ({ widgetEntity }: RenameMenuItemProps) => {
  const { dispatch } = useEditorContext();
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
              dispatch.widget.rename(widgetEntity.id, newValue.label);
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
  }, [dispatch.widget, widgetEntity.id, widgetEntity.label]);

  return (
    <Menu.Item icon={<Icon type="rename" size={14} />} onClick={openModal}>
      重命名
    </Menu.Item>
  );
};
