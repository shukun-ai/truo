import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import { useCallback } from 'react';

import { useAppContext } from '../../../../contexts/app-context';

import { ContainerForm, ContainerFormProps } from './container-form';

export type ContainerCreateButtonProps = {
  //
};

export const ContainerCreateButton = () => {
  const app = useAppContext();

  const onSubmit = useCallback<ContainerFormProps['onSubmit']>(
    ({ containerName }) => {
      app.repositories.presenterRepository.containerRepository.create(
        containerName,
      );
      modals.closeAll();
    },
    [app.repositories.presenterRepository.containerRepository],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建容器',
      children: <ContainerForm onSubmit={onSubmit} />,
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
      新建容器
    </Button>
  );
};
