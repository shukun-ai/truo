import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent, ReactNode } from 'react';

import { Header } from '../app/Header';
import { SideMenu } from '../menu';

import { AuthExpiredContainer } from './components/AuthExpiredContainer';

import { Body } from './components/Body';
import { Stage } from './components/Stage';
import { ViewBody } from './components/view/ViewBody';
import { ViewContent } from './components/view/ViewContent';
import { ViewStage } from './components/view/ViewStage';

export interface ViewLayoutProps {
  breadcrumb?: ReactNode;
  sideBarVisible?: boolean;
}

export const ViewLayout: LegacyFunctionComponent<ViewLayoutProps> = ({
  breadcrumb,
  children,
}) => {
  return (
    <Body>
      <Header />
      <Stage>
        <AuthExpiredContainer />
        <ViewStage>
          <ViewBody>
            <SideMenu />
            <ViewContent>{children}</ViewContent>
          </ViewBody>
        </ViewStage>
      </Stage>
    </Body>
  );
};
