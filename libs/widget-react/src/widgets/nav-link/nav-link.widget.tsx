import { NavLink, UnstyledButton } from '@mantine/core';
import { Box } from '@mui/joy';
import {
  navLinkDefinition,
  NavLinkDefinitionProps,
  NavLinkDefinitionValue,
} from '@shukun/widget';

import { IconPlus } from '@tabler/icons-react';
import { useMemo } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import { WidgetAppProps } from '../../abstracts/create-widget.interface';
export const NavLinkWidget = createWidget<NavLinkDefinitionProps>(
  navLinkDefinition,
  (props) => {
    return (
      <Box>
        <AssembledNavLinks
          links={props.value ?? []}
          app={props.app}
          level={0}
        />
      </Box>
    );
  },
);

const AssembledNavLinks = ({
  links,
  app,
  level,
}: {
  links: NavLinkDefinitionValue;
  app: WidgetAppProps;
  level: number;
}) => {
  return (
    <>
      {links.map((link) => {
        return (
          <AssembledNavLink
            key={link.label}
            link={link}
            app={app}
            level={level}
          />
        );
      })}
    </>
  );
};

const AssembledNavLink = ({
  link,
  app,
  level,
}: {
  link: NavLinkDefinitionValue[number];
  app: WidgetAppProps;
  level: number;
}) => {
  const hasChildren = useMemo(
    () => link.children && link.children.length > 0,
    [link.children],
  );

  if (typeof link !== 'object' || link === null) {
    return null;
  }

  return (
    <NavLink
      label={link.label}
      icon={level === 0 ? <IconPlus size={18} /> : null}
      onClick={() => {
        if (hasChildren) {
          return;
        }
        app.repositoryManager.getRouterRepository().trigger({
          action: 'push',
          page: link.screen,
          search: link.search,
        });
      }}
    >
      {link.children && link.children.length > 0 ? (
        <AssembledNavLinks links={link.children} app={app} level={level + 1} />
      ) : null}
    </NavLink>
  );
};
