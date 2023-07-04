import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';
import { Routes as ReactRoutes, Route, BrowserRouter } from 'react-router-dom';

import { RoutePath } from '../../routes';
import { Flow } from '../flow/flow';
import { FlowList } from '../flow-list/flow-list';
import { Home } from '../home/home';
import { NotFound } from '../not-found/not-found';
import { Welcome } from '../welcome/welcome';
import { Workspace } from '../workspace/workspace';

export interface RoutesProps {}

export const Routes: LegacyFunctionComponent<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path={RoutePath.FlowDetail} element={<Flow />} />
        <Route path={RoutePath.FlowList} element={<FlowList />} />
        <Route path={RoutePath.Welcome} element={<Welcome />} />
        <Route path={RoutePath.Workspace} element={<Workspace />}></Route>
        <Route
          path={RoutePath.Home}
          element={<Home />}
          errorElement={<NotFound />}
        />
      </ReactRoutes>
    </BrowserRouter>
  );
};
