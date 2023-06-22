import { Box, Table } from '@mantine/core';
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
      <PresenterCreateButton onSubmit={handleCreate} />
      <Table>
        <thead>
          <tr>
            <th>应用标识</th>
            <th>应用名称</th>
          </tr>
        </thead>
        <tbody>
          {presenters?.map((presenter) => (
            <tr>
              <td>
                <Link
                  to={routerMap.presenter
                    .replace(':orgName', routeOrgName)
                    .replace(':presenterName', presenter.name)}
                >
                  {presenter.name}
                </Link>
              </td>
              <td>{presenter.definition.label}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};
