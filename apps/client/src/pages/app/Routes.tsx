import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent } from 'react';
import { Router, Switch, Route, Redirect, useParams } from 'react-router-dom';

import { authStatus$ } from '../../services/session';
import {
  history,
  replaceOrgPath,
  RoutePath,
} from '../../utils/history-provider';
import { Dashboard } from '../dashboard';
import { Home } from '../home';
import { Hub } from '../hub';
import { ViewLayout } from '../layout/ViewLayout';
import { SignIn } from '../sign';
import { Upload } from '../upload';
import { View } from '../view';

import { PermissionLayout } from './components/PermissionLayout';
import { NotFound } from './NotFound';

export interface RoutesProps {}

export const Routes: FunctionComponent<RoutesProps> = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path={RoutePath.Hub} component={Hub} />
        <Route path={RoutePath.SignIn} component={SignIn} />
        <Route path={RoutePath.Dashboard} component={ProtectedRoutes} />
        <Route path={RoutePath.HomePage} exact component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export const ProtectedRoutes: FunctionComponent<RoutesProps> = () => {
  const authStatus = useObservableState(authStatus$);

  const { orgName } = useParams<{ orgName?: string }>();

  if (!authStatus) {
    return <></>;
  }

  if (authStatus.expired) {
    return orgName ? (
      <Redirect to={replaceOrgPath(RoutePath.SignIn, orgName)} />
    ) : (
      <Redirect to={RoutePath.Hub} />
    );
  }

  return (
    <PermissionLayout>
      <Router history={history}>
        <Switch>
          <Route path={RoutePath.Dashboard}>
            <ViewLayout>
              <Switch>
                <Route path={RoutePath.Plugin} component={Upload} />
                <Route path={RoutePath.ViewPage} component={View} />
                <Route path={RoutePath.Dashboard} exact component={Dashboard} />
              </Switch>
            </ViewLayout>
          </Route>
        </Switch>
      </Router>
    </PermissionLayout>
  );
};
