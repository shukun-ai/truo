import { modals } from '@mantine/modals';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import {
  PresenterScreenEntity,
  createScreenEntityId,
} from '../../../../../../../apps/editor/src/repositories/presenter/screen-ref';

import { ScreenForm, ScreenFormValue } from './screen-form';

export type UseScreenEditButtonProps = {
  screenEntity: PresenterScreenEntity;
};

export const useScreenEditButton = ({
  screenEntity,
}: UseScreenEditButtonProps) => {
  const app = useAppContext();

  const { presenterName } = useParams();

  const onSubmit = useCallback<(values: ScreenFormValue) => void>(
    (values) => {
      app.repositories.presenterRepository.screenRepository.update({
        id: createScreenEntityId(values.screenName),
        ...values,
      });
      modals.closeAll();
    },
    [app.repositories.presenterRepository.screenRepository],
  );

  const open = useCallback(() => {
    modals.open({
      title: '编辑页面',
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
