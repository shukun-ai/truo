import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';

import { SideMenu } from '../menu';

import { Content } from './Content';
import { Header } from './Header';

export interface DashboardLayoutProps {
  sideBarVisible?: boolean;
}

export const DashboardLayout: LegacyFunctionComponent<DashboardLayoutProps> = ({
  children,
  sideBarVisible,
}) => {
  return (
    <div>
      <Header />
      <Content sideBarVisible={sideBarVisible}>{children}</Content>
      {sideBarVisible && <SideMenu />}
    </div>
  );
};
