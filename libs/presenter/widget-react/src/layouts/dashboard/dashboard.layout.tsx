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

export type DashboardLayoutProps = {
  main?: JSX.Element;
  menu?: JSX.Element;
};

export const DashboardLayout = (props: DashboardLayoutProps) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 220, lg: 300 }}
          sx={{
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[1],
          }}
        >
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
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((open) => !open)}
                size="sm"
                color={theme.colors.dark[0]}
                mr="xl"
              />
            </MediaQuery>

            <Text color="rgba(255,255,255,0.9)" fw={500}>
              System
            </Text>
          </div>
        </Header>
      }
    >
      {props.main}
    </AppShell>
  );
};
