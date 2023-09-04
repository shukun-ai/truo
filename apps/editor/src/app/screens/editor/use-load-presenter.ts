import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDidMount } from 'rooks';

import { AppContextProps } from '../../contexts/app-context';

export const useLoadPresenter = (app: AppContextProps) => {
  const { presenterName } = useParams();
  const [presenterLoading, setPresenterLoading] = useState(true);
  const [otherLoading, setOtherLoading] = useState(true);

  useEffect(() => {
    if (presenterName) {
      setPresenterLoading(true);
      app.repositories.presenterRepository
        .initialize(presenterName)
        .finally(() => {
          setPresenterLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presenterName]);

  useDidMount(() => {
    setOtherLoading(true);
    Promise.all([
      app.repositories.connectorRepository.initialize(),
      app.repositories.taskRepository.initialize(),
      app.repositories.metadataRepository.initialize(app.apiRequester),
      app.repositories.environmentRepository.initialize(),
    ]).finally(() => {
      setOtherLoading(false);
    });
  });

  return {
    loading: presenterLoading && otherLoading,
  };
};
