import { Button, Popover, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { TypeException } from '@shukun/exception';
import { IconPlus } from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';
import { useCallback } from 'react';

import { useAppContext } from '../../../../contexts/app-context';

import { WatchForm, WatchFormValues } from './watch-form';

export type WatchCreateButtonProps = {
  //
};

export const WatchCreateButton = () => {
  const app = useAppContext();

  const containerName = useObservableState(
    app.repositories.presenterRepository.selectedContainerEntityId$,
    null,
  );

  const onSubmit = useCallback<(values: WatchFormValues) => void>(
    (values) => {
      if (!containerName) {
        throw new TypeException('The containerName is null when create watch.');
      }

      try {
        app.repositories.presenterRepository.watchRepository.create({
          ...values,
          containerName,
          triggers: {},
          events: [],
        });
        modals.closeAll();
      } catch {
        notifications.show({
          title: '观察器标识符重复',
          message: '该观察器标识符已存在，建议换个名称再次保存',
          color: 'red',
        });
      }
    },
    [app.repositories.presenterRepository.watchRepository, containerName],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建观察器',
      children: <WatchForm onSubmit={onSubmit} />,
    });
  }, [onSubmit]);

  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={!containerName}
    >
      <Popover.Target>
        <Button
          leftIcon={<IconPlus size="0.9rem" />}
          variant="subtle"
          size="sm"
          onClick={open}
          fullWidth
          disabled={!containerName}
        >
          新建观察器
        </Button>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        <Text size="sm">请先选择一个容器后才可创建观察器</Text>
      </Popover.Dropdown>
    </Popover>
  );
};
