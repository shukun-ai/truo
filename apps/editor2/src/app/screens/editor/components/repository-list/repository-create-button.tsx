import { Button, Popover, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { TypeException } from '@shukun/exception';
import { IconPlus } from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';
import { useCallback } from 'react';

import { useAppContext } from '../../../../contexts/app-context';

import { RepositoryForm, RepositoryFormValues } from './repository-form';

export type RepositoryCreateButtonProps = {
  //
};

export const RepositoryCreateButton = () => {
  const app = useAppContext();

  const containerName = useObservableState(
    app.repositories.presenterRepository.selectedContainerEntityId$,
    null,
  );

  const onSubmit = useCallback<(values: RepositoryFormValues) => void>(
    (values) => {
      if (!containerName) {
        throw new TypeException(
          'The containerName is null when create repository.',
        );
      }

      try {
        app.repositories.presenterRepository.repositoryRepository.create({
          ...values,
          type: 'simple', // TODO
          parameters: {},
          containerName,
        });
        modals.closeAll();
      } catch {
        notifications.show({
          title: '数据仓库标识符重复',
          message: '该数据仓库标识符已存在，建议换个名称再次保存',
          color: 'red',
        });
      }
    },
    [app.repositories.presenterRepository.repositoryRepository, containerName],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建数据仓库',
      children: <RepositoryForm onSubmit={onSubmit} />,
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
          新建数据仓库
        </Button>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        <Text size="sm">请先选择一个容器后才可创建数据仓库</Text>
      </Popover.Dropdown>
    </Popover>
  );
};
