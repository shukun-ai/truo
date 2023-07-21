import { Alert, Anchor, Box, Table, Text, Title } from '@mantine/core';
import { useObservableState } from 'observable-hooks';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDidMount } from 'rooks';

import { useAppContext } from '../../../contexts/app-context';

import { useRouteOrgName } from '../../../hooks/use-route-org-name';
import { routerMap } from '../../../router-map';

import { PresenterCreateButton } from './presenter-create-button';

export type PresenterSectionProps = {
  //
};

export const PresenterSection = () => {
  const app = useAppContext();

  const presenters = useObservableState(
    app.repositories.globalRepository.presenters$,
    null,
  );

  const handleCreate = useCallback<(values: { text: string }) => void>(
    async (values) => {
      await app.repositories.presenterRepository.synchronizeService.create(
        values.text,
      );
      await app.repositories.globalRepository.fetchPresenters();
    },
    [
      app.repositories.globalRepository,
      app.repositories.presenterRepository.synchronizeService,
    ],
  );

  const routeOrgName = useRouteOrgName();

  useDidMount(() => {
    app.repositories.globalRepository.fetchPresenters();
  });

  return (
    <Box>
      <Title order={4}>应用列表</Title>

      <PresenterCreateButton onSubmit={handleCreate} />

      <Table>
        <thead>
          <tr>
            <th>应用标识</th>
            <th>应用名称</th>
            <th>更新时间</th>
          </tr>
        </thead>
        <tbody>
          {presenters?.map((presenter) => (
            <tr>
              <td>
                <Anchor
                  component={Link}
                  to={routerMap.presenter
                    .replace(':orgName', routeOrgName)
                    .replace(':presenterName', presenter.name)}
                  target="_blank"
                >
                  {presenter.name}
                </Anchor>
              </td>
              <td>{presenter.definition.label}</td>
            </tr>
          ))}
          {(!presenters || presenters.length === 0) && (
            <tr>
              <td colSpan={3}>
                <Alert>
                  <Text align="center" fw="bold">
                    点击上方按钮创建您的第一个应用
                  </Text>
                </Alert>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Box>
  );
};
