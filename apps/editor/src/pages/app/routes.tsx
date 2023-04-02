import React, { FunctionComponent } from 'react';
import { Routes as ReactRoutes, Route, BrowserRouter } from 'react-router-dom';

import { RoutePath } from '../../routes';
import { FlowList } from '../flow-list/flow-list';
import { Flow } from '../flow/flow';
import { Home } from '../home/home';
import { NotFound } from '../not-found/not-found';
import { Welcome } from '../welcome/welcome';
import { Workspace } from '../workspace/workspace';

export interface RoutesProps {}

export const Routes: FunctionComponent<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path={RoutePath.Welcome} element={<Welcome />} />
        <Route path={RoutePath.Workspace} element={<Workspace />}>
          <Route path={RoutePath.FlowDetail} element={<Flow />} />
          <Route path={RoutePath.FlowList} element={<FlowList />} />
        </Route>
        <Route
          path={RoutePath.Home}
          element={<Home />}
          errorElement={<NotFound />}
        />
      </ReactRoutes>
    </BrowserRouter>
  );
};
