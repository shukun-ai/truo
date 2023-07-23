import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { createScreenEntityId } from '../../../../../repositories/presenter/screen-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { ScreenForm, ScreenFormValue } from './screen-form';

export type ScreenCreateButtonProps = {
  //
};

export const ScreenCreateButton = () => {
  const app = useAppContext();

  const { presenterName } = useParams();

  const onSubmit = useCallback<(values: ScreenFormValue) => void>(
    (values) => {
      try {
        app.repositories.presenterRepository.screenRepository.create({
          id: createScreenEntityId(values.screenName),
          ...values,
        });
        modals.closeAll();
      } catch {
        notifications.show({
          title: '页面标识符重复',
          message: '该页面标识符已存在，建议换个名称再次保存',
          color: 'red',
        });
      }
    },
    [app.repositories.presenterRepository.screenRepository],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建页面',
      children: (
        <ScreenForm
          presenterName={presenterName}
          screenEntity={null}
          onSubmit={onSubmit}
        />
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
      新建页面
    </Button>
  );
};
