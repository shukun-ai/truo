import { Header, Button, Container, Group, Popover, Text } from '@mantine/core';
import { ShukunBrand } from '@shukun/component';
import { IconExternalLink } from '@tabler/icons-react';

import { useState } from 'react';

import { useRealtimeButton } from '../hooks/use-realtime-button';

import { SavePresenterButton } from './common/save-presenter-button';

export type TopBarProps = {
  //
};

export const TopBar = () => {
  const { handleOpen } = useRealtimeButton();

  const [openedPopover, setOpenedPopover] = useState(true);

  return (
    <Header height={42}>
      <Container
        fluid
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <ShukunBrand />
        <Group spacing={5}>
          <Popover
            opened={openedPopover}
            width={200}
            position="bottom"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <Button
                leftIcon={<IconExternalLink size="0.9rem" />}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
                onClick={() => {
                  handleOpen();
                  setOpenedPopover(false);
                }}
              >
                实时预览
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="xs">请点击此处打开新窗口进行编辑器预览</Text>
            </Popover.Dropdown>
          </Popover>

          <SavePresenterButton />
        </Group>
      </Container>
    </Header>
  );
};
