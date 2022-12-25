import React, { FunctionComponent } from 'react';
import { Router, Switch, Route, Redirect, useParams } from 'react-router-dom';

import { history, RoutePath } from '../../routes';
import { FlowList } from '../flow-list/flow-list';
import { Flow } from '../flow/flow';
import { Home } from '../home/home';
import { NotFound } from '../not-found/not-found';
import { Welcome } from '../welcome/welcome';
import { Workspace } from '../workspace/workspace';

export interface RoutesProps {}

export const Routes: FunctionComponent<RoutesProps> = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path={RoutePath.Welcome} component={Welcome} />
        <Route path={RoutePath.Workspace}>
          <Workspace>
            <Switch>
              <Route path={RoutePath.FlowDetail} component={Flow} />
              <Route path={RoutePath.FlowList} component={FlowList} />
            </Switch>
          </Workspace>
        </Route>
        <Route path={RoutePath.Home} exact component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};
