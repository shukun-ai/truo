import { PlusOutlined } from '@ant-design/icons';
import { LegacyFunctionComponent } from '@shukun/component';
import { RoleResourceType, ViewSchema, ViewType } from '@shukun/schema';
import { Menu, MenuProps } from 'antd';
import { MenuItemType, SubMenuType } from 'antd/lib/menu/hooks/useItems';
import { useObservableState } from 'observable-hooks';
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Flex } from '../../components/flex';
import { grantList$, grantRoles$, isGranted } from '../../services/security';
import { activeViews$ } from '../../services/view';
import { designSystem } from '../../utils/design-system';
import { RoutePath, useOrgPath } from '../../utils/history-provider';

import { SideLinkItem } from './components/SideLinkItem';

const HOMEPAGE_KEY = '$$homepage';

export interface SideMenuProps {}

export const SideMenu: LegacyFunctionComponent<SideMenuProps> = () => {
  const location = useLocation();

  const dashboardOrgPath = useOrgPath(RoutePath.Dashboard);

  const views = useObservableState(activeViews$, []);

  const grantList = useObservableState(grantList$, []);

  const grantRoles = useObservableState(grantRoles$, []);

  const grantedViews = useMemo(() => {
    return views.filter(
      (view) =>
        isGranted({
          grantList,
          grantRoles,
          type: RoleResourceType.View,
          name: view.name,
        }) || view.type === ViewType.Menu,
    );
  }, [grantList, grantRoles, views]);

  const subMenu = useMemo(() => {
    const firstLevelViews = grantedViews.filter((item) => !item.parentName);
    return createMenu(firstLevelViews, grantedViews);
  }, [grantedViews]);

  const selectedKeys = useMemo(() => {
    if (location.pathname === dashboardOrgPath) {
      return [HOMEPAGE_KEY];
    }

    const path = location.pathname.split('/');
    const currentPath = path[path.length - 1];

    return [currentPath];
  }, [location, dashboardOrgPath]);

  const menuItem = useMemo<NonNullable<MenuProps['items']>>(() => {
    return [
      {
        key: HOMEPAGE_KEY,
        className: 'global-side-menu__top',
        icon: <PlusOutlined />,
        label: <Link to={dashboardOrgPath}>首页</Link>,
      },
      ...subMenu,
    ];
  }, [dashboardOrgPath, subMenu]);

  return (
    <Flex
      className="global-side-menu"
      style={{
        top: designSystem.headerHeight,
        width: designSystem.sideBarWidth,
        overflowY: 'scroll',
      }}
    >
      <Menu
        className="global-side-menu__menu"
        mode="inline"
        selectedKeys={selectedKeys}
        items={menuItem}
      />
    </Flex>
  );
};

function createMenu(
  firstLevelViews: ViewSchema[],
  allViews: ViewSchema[],
  level = 0,
) {
  const menu = firstLevelViews.map((view) => {
    if (view.type === ViewType.Menu) {
      const secondLevelViews = allViews.filter(
        (item) => item.parentName === view.name,
      );

      // Don't show self if there hasn't children.
      if (secondLevelViews.length === 0) {
        return null;
      }

      return createSubMenu({
        view,
        level,
        secondLevelViews,
        allViews,
      });
    } else {
      return createMenuItem({ view, level });
    }
  });

  return menu.filter((item) => item !== null);
}

function createSubMenu(props: {
  view: ViewSchema;
  level: number;
  secondLevelViews: ViewSchema[];
  allViews: ViewSchema[];
}): SubMenuType {
  const { view, level, secondLevelViews, allViews } = props;

  return {
    key: view.name,
    label: view.label,
    className:
      level === 0 ? 'global-side-menu__top' : 'global-side-menu__child',
    icon: level === 0 && <PlusOutlined />,
    children: createMenu(secondLevelViews, allViews, level + 1),
  };
}

function createMenuItem(props: {
  view: ViewSchema;
  level: number;
}): MenuItemType {
  const { view, level } = props;

  return {
    key: view.name,
    label: <SideLinkItem view={view} />,
    className:
      level === 0 ? 'global-side-menu__top' : 'global-side-menu__child',
    icon: level === 0 && <PlusOutlined />,
  };
}
