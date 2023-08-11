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
  const app = useAppContext();

  const { disabledSystem } = useEditorContext();

  const onSubmit = useCallback<(values: CreateFormValues) => void>(
    (values) => {
      try {
        app.repositories.metadataRepository.create(values.metadataName);
        modals.closeAll();
      } catch {
        notifications.show({
          title: '数据表标识符重复',
          message: '该数据表标识符已存在，建议换个名称再次保存',
          color: 'red',
        });
      }
    },
    [app.repositories.metadataRepository],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建数据表',
      children: <CreateForm onSubmit={onSubmit} />,
    });
  }, [onSubmit]);

  if (disabledSystem) {
    return (
      <Title order={4} p={12}>
        查看数据表
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
      新建数据表
    </Button>
  );
};
