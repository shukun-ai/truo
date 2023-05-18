import { Table } from '@mantine/core';
import { useObservableState } from 'observable-hooks';
import { useDidMount } from 'rooks';

import { useAppContext } from '../../../contexts/app-context';

export type PresenterSectionProps = {
  //
};

export const PresenterSection = () => {
  const app = useAppContext();

  const presenters = useObservableState(
    app.repositories.presenterRepository.entities$,
    null,
  );

  useDidMount(() => {
    app.repositories.presenterRepository.findAll();
  });

  return (
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
            <td>{presenter.name}</td>
            <td>{presenter.definition.title}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
