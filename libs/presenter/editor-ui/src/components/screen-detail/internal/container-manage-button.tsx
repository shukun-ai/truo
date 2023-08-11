import { Button } from '@mantine/core';

import { IconBoxModel2 } from '@tabler/icons-react';

export type ContainerManageButtonProps = {
  //
};

export const ContainerManageButton = () => {
  const app = useAppContext();

  return (
    <Button
      variant="subtle"
      onClick={() => {
        app.repositories.tabRepository.previewContainersTab();
      }}
      fullWidth
      leftIcon={<IconBoxModel2 size="0.9rem" />}
    >
      管理容器
    </Button>
  );
};
