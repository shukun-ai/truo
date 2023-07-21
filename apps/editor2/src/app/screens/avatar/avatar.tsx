import {
  createStyles,
  Avatar as BaseAvatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
  Badge,
} from '@mantine/core';
import {
  IconLogout,
  IconMessage,
  IconChevronDown,
  IconBook,
  IconKeyboard,
  IconAffiliateFilled,
  IconUserCircle,
} from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';
import { useCallback, useState } from 'react';

import { useAppContext } from '../../contexts/app-context';

export const Avatar = () => {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const show = false;

  const app = useAppContext();

  const currentUser = useObservableState(
    app.repositories.authRepository.currentUser$,
  );

  const signOut = useCallback(() => {
    app.repositories.authRepository.signOut();
    window.location.reload();
  }, [app.repositories.authRepository]);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
      shadow="md"
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group spacing={7}>
            <BaseAvatar radius="xl" size={28} color="blue">
              {currentUser?.username?.substring(0, 1) ?? 'N'}
            </BaseAvatar>
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={4}>
              {currentUser?.username}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {show && <Menu.Label>使用</Menu.Label>}
        {show && (
          <Menu.Item
            icon={
              <IconMessage
                size="0.9rem"
                stroke={1.5}
                color={theme.colors.red[6]}
              />
            }
          >
            产品建议与报错{' '}
            <Badge color="red" size="xs">
              HOT
            </Badge>
          </Menu.Item>
        )}
        {show && (
          <Menu.Item icon={<IconBook size="0.9rem" stroke={1.5} />}>
            使用文档
          </Menu.Item>
        )}
        {show && (
          <Menu.Item icon={<IconKeyboard size="0.9rem" stroke={1.5} />}>
            快捷键
          </Menu.Item>
        )}
        {show && (
          <Menu.Item icon={<IconAffiliateFilled size="0.9rem" stroke={1.5} />}>
            组织管理
          </Menu.Item>
        )}
        {show && <Menu.Label>个人</Menu.Label>}
        {show && (
          <Menu.Item icon={<IconUserCircle size="0.9rem" stroke={1.5} />}>
            个人账户
          </Menu.Item>
        )}
        <Menu.Item
          icon={<IconLogout size="0.9rem" stroke={1.5} />}
          onClick={signOut}
        >
          退出登录
        </Menu.Item>
        <Menu.Label>Runtime Version 1.27.0</Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
};

const useStyles = createStyles((theme) => ({
  user: {
    height: '49px',
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    transition: 'background-color 100ms ease',
    '&:hover': {
      backgroundColor: theme.colors.gray[3],
    },
  },

  userActive: {
    backgroundColor: theme.colors.gray[3],
  },
}));
