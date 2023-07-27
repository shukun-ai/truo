import { Menu } from '@mantine/core';
import { modals } from '@mantine/modals';

import { useCallback } from 'react';

import { PresenterWidgetEntity } from '../../../../../../repositories/presenter/widget-ref';
import { Icon } from '../../../../../components/domain-icons/domain-icons';
import { RenameForm } from '../../../../../components/rename-form/rename-form';
import { useAppContext } from '../../../../../contexts/app-context';

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
            app.repositories.presenterRepository.widgetRepository.rename(
              widgetEntity.id,
              newValue.label,
            );
            modals.closeAll();
          }}
        />
      ),
    });
  }, [
    app.repositories.presenterRepository.widgetRepository,
    widgetEntity.id,
    widgetEntity.label,
  ]);

  return (
    <Menu.Item icon={<Icon type="rename" size={14} />} onClick={openModal}>
      重命名
    </Menu.Item>
  );
};
