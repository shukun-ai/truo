import React, { FunctionComponent, ReactNode } from 'react';

import { Header } from '../app/Header';
import { SideMenu } from '../menu';

import { Body } from './components/Body';
import { Stage } from './components/Stage';
import { ViewBody } from './components/view/ViewBody';
import { ViewContent } from './components/view/ViewContent';
import { ViewStage } from './components/view/ViewStage';

export interface ViewLayoutProps {
  breadcrumb?: ReactNode;
  sideBarVisible?: boolean;
}

export const ViewLayout: FunctionComponent<ViewLayoutProps> = ({
  breadcrumb,
  children,
}) => {
  return (
    <Body>
      <Header />
      <Stage>
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
