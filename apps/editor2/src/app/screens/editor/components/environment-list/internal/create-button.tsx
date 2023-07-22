import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useCallback } from 'react';

import { useAppContext } from '../../../../../contexts/app-context';

import { CreateForm, CreateFormValues } from './create-form';

export type CreateButtonProps = {
  //
};

export const CreateButton = () => {
  const app = useAppContext();

  const onSubmit = useCallback<(values: CreateFormValues) => void>(
    (values) => {
      try {
        app.repositories.environmentRepository.create(values.environmentName);
        modals.closeAll();
      } catch {
        notifications.show({
          title: '环境变量标识符重复',
          message: '该环境变量标识符已存在，建议换个名称再次保存',
          color: 'red',
        });
      }
    },
    [app.repositories.environmentRepository],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建环境变量',
      children: <CreateForm onSubmit={onSubmit} />,
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
      新建环境变量
    </Button>
  );
};
