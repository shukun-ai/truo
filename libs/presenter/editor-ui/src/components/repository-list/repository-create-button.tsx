import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useCallback } from 'react';

import { useEditorContext } from '../../editor-context';

import { RepositoryForm, RepositoryFormValues } from './repository-form';

export type RepositoryCreateButtonProps = {
  //
};

export const RepositoryCreateButton = () => {
  const { state, dispatch } = useEditorContext();

  const onSubmit = useCallback<(values: RepositoryFormValues) => void>(
    (values) => {
      try {
        dispatch.repository.create({
          ...values,
          parameters: {},
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
    [dispatch.repository],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建数据仓库',
      children: (
        <RepositoryForm
          onSubmit={onSubmit}
          repositoryDefinitions={state.repositoryDefinitions}
          isUniqueId={dispatch.repository.isUniqueId}
        />
      ),
    });
  }, [dispatch.repository.isUniqueId, onSubmit, state.repositoryDefinitions]);

  return (
    <Button
      leftIcon={<IconPlus size="0.9rem" />}
      variant="subtle"
      size="sm"
      onClick={open}
      fullWidth
    >
      新建数据仓库
    </Button>
  );
};
