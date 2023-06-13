import { Button } from '@mantine/core';
import { useCallback, useState } from 'react';

import { useAppContext } from '../../../../contexts/app-context';

export type SavePresenterButtonProps = {
  //
};

export const SavePresenterButton = () => {
  const app = useAppContext();

  const [loading, setLoading] = useState(false);

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      const presenter =
        app.repositories.presenterRepository.deserializationService.build();
      await app.repositories.presenterRepository.synchronizeService.save(
        presenter,
      );
    } finally {
      setLoading(false);
    }
  }, [
    app.repositories.presenterRepository.deserializationService,
    app.repositories.presenterRepository.synchronizeService,
  ]);

  return (
    <Button onClick={handleSave} loading={loading}>
      保存
    </Button>
  );
};
