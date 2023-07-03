import { Button } from '@mantine/core';
import { useCallback, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAppContext } from '../../../../contexts/app-context';
import { refreshPreview } from '../../events/preview-event';

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
    const presenter =
      app.repositories.presenterRepository.deserializationService.build();
    try {
      app.repositories.presenterRepository.synchronizeService.update(
        presenterName,
        presenter,
      );
    } finally {
      setLoading(false);
    }

    // TODO use context to instead import explicitly
    refreshPreview();
  }, [
    app.repositories.presenterRepository.deserializationService,
    app.repositories.presenterRepository.synchronizeService,
    presenterName,
  ]);

  return (
    <Button onClick={handleSave} loading={loading}>
      保存刷新预览
    </Button>
  );
};
