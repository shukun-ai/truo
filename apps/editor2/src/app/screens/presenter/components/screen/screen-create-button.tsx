import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { omit } from 'lodash';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../../../../contexts/app-context';

import { ScreenForm, ScreenFormValues } from './screen-form';

export type ScreenCreateButtonProps = {
  //
};

export const ScreenCreateButton = () => {
  const app = useAppContext();

  const { presenterName } = useParams();

  const onSubmit = useCallback<(values: ScreenFormValues) => void>(
    (values) => {
      try {
        app.repositories.presenterRepository.screenRepository.create(
          values.screenId,
          omit(values, 'screenId'),
        );
        modals.closeAll();
      } catch {
        notifications.show({
          title: '路由标识符重复',
          message: '该路由标识符已存在，建议换个名称再次保存',
          color: 'red',
        });
      }
    },
    [app.repositories.presenterRepository.screenRepository],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建路由',
      children: (
        <ScreenForm presenterName={presenterName} onSubmit={onSubmit} />
      ),
    });
  }, [onSubmit, presenterName]);

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
