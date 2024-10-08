import { Button, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useCallback } from 'react';

import { useEditorContext } from '../../../editor-context';

import { CreateForm, CreateFormValues } from './create-form';

export type CreateButtonProps = {
  //
};

export const CreateButton = () => {
  const { dispatch } = useEditorContext();

  const onSubmit = useCallback<(values: CreateFormValues) => void>(
    (values) => {
      try {
        dispatch.environment.create(values.environmentName);
        modals.closeAll();
      } catch {
        notifications.show({
          title: '环境变量标识符重复',
          message: '该环境变量标识符已存在，建议换个名称再次保存',
          color: 'red',
        });
      }
    },
    [dispatch.environment],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建环境变量',
      children: <CreateForm onSubmit={onSubmit} />,
    });
  }, [onSubmit]);

  const { disabledSystem } = useEditorContext();

  if (disabledSystem) {
    return (
      <Title order={4} p={12}>
        查看环境变量
      </Title>
    );
  }

  return (
    <Button
      leftIcon={<IconPlus size="0.9rem" />}
      variant="subtle"
      size="sm"
      onClick={open}
      fullWidth
    >
      新建环境变量
    </Button>
  );
};
