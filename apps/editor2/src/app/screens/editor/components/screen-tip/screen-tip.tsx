import {
  Popover,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useObservableState } from 'observable-hooks';
import { useMemo } from 'react';

import { useAppContext } from '../../../../contexts/app-context';

export const ScreenTip = () => {
  const theme = useMantineTheme();
  const app = useAppContext();
  const [opened, { close, open }] = useDisclosure(false);
  const allScreens = useObservableState(
    app.repositories.presenterRepository.screenRepository.all$,
    [],
  );
  const selectedScreenEntityId = useObservableState(
    app.repositories.presenterRepository.screenRepository
      .selectedScreenEntityId$,
    null,
  );
  const allContainers = useObservableState(
    app.repositories.presenterRepository.containerRepository.all$,
    [],
  );
  const selectedContainerEntityId = useObservableState(
    app.repositories.presenterRepository.selectedContainerEntityId$,
    null,
  );

  const screen = useMemo(() => {
    if (!selectedScreenEntityId) {
      return null;
    }
    return allScreens.find((screen) => screen.id === selectedScreenEntityId);
  }, [allScreens, selectedScreenEntityId]);

  const container = useMemo(() => {
    if (!selectedContainerEntityId) {
      return null;
    }
    return allContainers.find(
      (container) => container.id === selectedContainerEntityId,
    );
  }, [allContainers, selectedContainerEntityId]);

  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <UnstyledButton
          onMouseEnter={open}
          onMouseLeave={close}
          onClick={() => {
            app.repositories.tabRepository.previewScreensTab();
          }}
          sx={{
            background: theme.fn.linearGradient(120, 'cyan', 'indigo', 'cyan'),
            color: 'rgba(255,255,255,0.8)',
            transition: 'all 600ms',
            ':hover': {
              boxShadow: 'inset 0px 0px 20px rgba(0,0,0,0.5)',
              color: 'rgba(255,255,255,1)',
              paddingTop: 8,
              paddingBottom: 8,
            },
            borderRadius: 12,
          }}
          p={4}
          m={8}
        >
          {screen ? (
            <Stack spacing={0}>
              <Text align="center" size="lg">
                {screen?.screenName}
              </Text>
              <Text align="center" size="xs">
                {container?.containerName}
              </Text>
            </Stack>
          ) : (
            <Text c="white" align="center" size="lg" pt={8} pb={8}>
              请点击选择页面和容器
            </Text>
          )}
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        <Text size="sm" fw="bold">
          点击选择不同的页面进行编辑
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
};
