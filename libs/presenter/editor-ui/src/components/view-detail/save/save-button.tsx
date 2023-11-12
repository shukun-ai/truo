import { Alert, Button, Group, Text } from '@mantine/core';
import { useCallback, useRef, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useEditorContext } from '../../../editor-context';

export type SaveButtonProps = {
  viewName: string;
};

export const SaveButton = ({ viewName }: SaveButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useEditorContext();
  const previewRef = useRef<Window | null>(null);
  const { orgName } = useParams();
  const url = `${state.clientDomain}/${orgName}/views/${viewName}`;

  const onSave = useCallback(async () => {
    setLoading(true);
    try {
      await dispatch.view.push();
      const closed = previewRef.current?.closed ?? true;

      if (!previewRef.current || closed) {
        previewRef.current = window.open(url, 'mozillaTab');
      } else {
        previewRef.current.focus();
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch.view, url]);

  return (
    <Alert>
      <Group>
        <Text>编辑视图的配置，点此可保存并预览</Text>
        <Button size="xs" variant="outline" onClick={onSave} loading={loading}>
          保存并预览
        </Button>
      </Group>
    </Alert>
  );
};
