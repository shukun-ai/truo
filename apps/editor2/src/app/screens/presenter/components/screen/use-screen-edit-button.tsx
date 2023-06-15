import { modals } from '@mantine/modals';
import { omit } from 'lodash';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { PresenterScreenEntity } from '../../../../../repositories/presenter/screen-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { ScreenForm, ScreenFormValues } from './screen-form';

export type UseScreenEditButtonProps = {
  screenEntity: PresenterScreenEntity;
};

export const useScreenEditButton = ({
  screenEntity,
}: UseScreenEditButtonProps) => {
  const app = useAppContext();

  const { presenterName } = useParams();

  const onSubmit = useCallback<(values: ScreenFormValues) => void>(
    (values) => {
      app.repositories.presenterRepository.screenRepository.update(
        values.screenId,
        omit(values, 'screenId'),
      );
      modals.closeAll();
    },
    [app.repositories.presenterRepository.screenRepository],
  );

  const open = useCallback(() => {
    modals.open({
      title: '编辑路由',
      children: (
        <ScreenForm
          presenterName={presenterName}
          screenEntity={screenEntity}
          onSubmit={onSubmit}
        />
      ),
    });
  }, [onSubmit, presenterName, screenEntity]);

  return { open };
};
