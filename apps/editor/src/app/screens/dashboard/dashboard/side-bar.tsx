import { Badge, Box, NavLink, Text } from '@mantine/core';
import { Link, matchPath, useMatches } from 'react-router-dom';

import { useMenu } from '../use-menu';

export const SideBar = () => {
  const menu = useMenu();

  const matches = useMatches();

  return (
    <Box>
      {menu.map((menuItem) => (
        <>
          <Text size="xs" c="gray" fw="bold">
            {menuItem.label}
          </Text>
          {menuItem.children.map((child) => (
            <NavLink
              label={child.label}
              icon={child.icon}
              component={Link}
              to={child.path ?? ''}
              active={
                child.path
                  ? !!matchPath(
                      child.path,
                      matches[matches.length - 1].pathname,
                    )
                  : false
              }
              disabled={child.disabled}
              rightSection={child.disabled && <Badge>未开放</Badge>}
            />
          ))}
        </>
      ))}
    </Box>
  );
};
