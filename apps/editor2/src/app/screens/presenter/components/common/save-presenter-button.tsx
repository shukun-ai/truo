import { Button } from '@mantine/core';
import { useCallback, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAppContext } from '../../../../contexts/app-context';

export type SavePresenterButtonProps = {
  //
};

export const SavePresenterButton = () => {
  const app = useAppContext();

  const [loading, setLoading] = useState(false);

  const { presenterName } = useParams();

  const handleSave = useCallback(async () => {
    if (!presenterName) {
      return;
    }
    setLoading(true);
    try {
      const presenter =
        app.repositories.presenterRepository.deserializationService.build();
      app.repositories.presenterRepository.synchronizeService.update(
        presenterName,
        presenter,
      );
    } finally {
      setLoading(false);
    }
  }, [
    app.repositories.presenterRepository.deserializationService,
    app.repositories.presenterRepository.synchronizeService,
    presenterName,
  ]);

  return (
    <Button onClick={handleSave} loading={loading}>
      保存
    </Button>
  );
};
