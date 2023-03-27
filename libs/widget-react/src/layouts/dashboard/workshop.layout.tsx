import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';

export type WorkshopLayoutProps = {
  main?: JSX.Element;
  menu?: JSX.Element;
};

export const WorkshopLayout = (props: WorkshopLayoutProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      navbarOffsetBreakpoint="xl"
      asideOffsetBreakpoint="xl"
      navbar={
        <Navbar p="md" hiddenBreakpoint="xl" hidden={!opened}>
          {props.menu}
        </Navbar>
      }
      header={
        <Header
          height={{ base: 50, md: 54 }}
          p="md"
          sx={{
            background: 'rgb(14, 23, 38)',
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="xl" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((open) => !open)}
                size="sm"
                color={theme.colors.dark[0]}
                mr="xl"
              />
            </MediaQuery>

            <Text color="rgba(255,255,255,0.9)" fw={500}>
              Shukun System
            </Text>
          </div>
        </Header>
      }
    >
      {props.main}
    </AppShell>
  );
};
