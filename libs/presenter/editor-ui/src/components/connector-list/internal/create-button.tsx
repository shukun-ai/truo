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
        dispatch.connector.create(values.connectorName);
        modals.closeAll();
      } catch {
        notifications.show({
          title: '函数流标识符重复',
          message: '该函数流标识符已存在，建议换个名称再次保存',
          color: 'red',
        });
      }
    },
    [dispatch.connector],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建函数流',
      children: <CreateForm onSubmit={onSubmit} />,
    });
  }, [onSubmit]);

  const { disabledSystem } = useEditorContext();

  if (disabledSystem) {
    return (
      <Title order={4} p={12}>
        查看函数流
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
      新建函数流
    </Button>
  );
};
