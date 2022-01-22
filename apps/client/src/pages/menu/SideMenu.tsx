import { PlusOutlined } from '@ant-design/icons';
import { ViewSchema, ViewType } from '@shukun/schema';
import { Menu } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Flex } from '../../components/flex';
import { grantList$, grantRoles$, isGranted } from '../../services/security';
import { activeViews$ } from '../../services/view';
import { designSystem } from '../../utils/design-system';
import { RoutePath, useOrgPath } from '../../utils/history-provider';

import { SideLinkItem } from './components/SideLinkItem';

const HOMEPAGE_KEY = '$$homepage';

export interface SideMenuProps {}

export const SideMenu: FunctionComponent<SideMenuProps> = () => {
  const location = useLocation();

  const dashboardOrgPath = useOrgPath(RoutePath.Dashboard);

  const views = useObservableState(activeViews$, []);

  const grantList = useObservableState(grantList$, null);

  const grantRoles = useObservableState(grantRoles$, null);

  const grantedViews = useMemo(() => {
    return views.filter(
      (view) =>
        isGranted({
          grantList,
          grantRoles,
          resource: `view/${view.name}`,
          action: 'read:any',
        }) || view.type === ViewType.Menu,
    );
  }, [grantList, grantRoles, views]);

  const subMenu = useMemo(() => {
    const firstLevelViews = grantedViews.filter((item) => !item.parentName);
    return createSubMenu(firstLevelViews, grantedViews);
  }, [grantedViews]);

  const selectedKeys = useMemo(() => {
    if (location.pathname === dashboardOrgPath) {
      return [HOMEPAGE_KEY];
    }

    const path = location.pathname.split('/');
    const currentPath = path[path.length - 1];

    return [currentPath];
  }, [location, dashboardOrgPath]);

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
      >
        <Menu.Item
          key={HOMEPAGE_KEY}
          className="global-side-menu__top"
          icon={<PlusOutlined />}
        >
          <Link to={dashboardOrgPath}>首页</Link>
        </Menu.Item>
        {subMenu}
      </Menu>
    </Flex>
  );
};

function createSubMenu(
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

      return (
        <Menu.SubMenu
          key={view.name}
          title={view.label}
          className={
            level === 0 ? 'global-side-menu__top' : 'global-side-menu__child'
          }
          icon={level === 0 && <PlusOutlined />}
        >
          {createSubMenu(secondLevelViews, allViews, level + 1)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item
          key={view.name}
          className={
            level === 0 ? 'global-side-menu__top' : 'global-side-menu__child'
          }
          icon={level === 0 && <PlusOutlined />}
        >
          <SideLinkItem view={view} />
        </Menu.Item>
      );
    }
  });

  return menu.filter((item) => item !== null);
}
