import { Button } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useCallback, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useEditorDispatch } from '../../editor-context';
import { refreshPreview } from '../../events/preview-event';

export type SavePresenterButtonProps = {
  //
};

export const SavePresenterButton = () => {
  const { deserialization, synchronize } = useEditorDispatch();

  const [loading, setLoading] = useState(false);

  const { presenterName } = useParams();

  const handleSave = useCallback(async () => {
    if (!presenterName) {
      return;
    }
    setLoading(true);
    const presenter = deserialization.build();
    try {
      await synchronize.update(presenterName, presenter);
    } finally {
      setLoading(false);
    }

    // TODO use context to instead import explicitly
    refreshPreview();
  }, [deserialization, presenterName, synchronize]);

  return (
    <Button
      onClick={handleSave}
      loading={loading}
      size="xs"
      variant="filled"
      leftIcon={<IconRefresh size="0.8rem" />}
    >
      保存刷新后预览
    </Button>
  );
};
