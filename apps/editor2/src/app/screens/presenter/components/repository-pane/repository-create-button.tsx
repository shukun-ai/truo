import { Button } from '@mantine/core';
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

  const containerId = useObservableState(
    app.repositories.presenterRepository.selectedContainerId$,
    null,
  );

  const onSubmit = useCallback<(values: RepositoryFormValues) => void>(
    (values) => {
      if (!containerId) {
        throw new TypeException(
          'The containerId is null when create repository.',
        );
      }

      try {
        app.repositories.presenterRepository.repositoryRepository.create({
          ...values,
          type: 'simple', // TODO
          parameters: {},
          containerId,
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
    [app.repositories.presenterRepository.repositoryRepository, containerId],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建数据仓库',
      children: <RepositoryForm onSubmit={onSubmit} />,
    });
  }, [onSubmit]);

  return (
    <Button
      leftIcon={<IconPlus size="0.9rem" />}
      variant="subtle"
      size="sm"
      onClick={open}
      fullWidth
    >
      新建
    </Button>
  );
};
