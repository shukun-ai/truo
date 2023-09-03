import { Card, Code, Divider, Title } from '@mantine/core';

import { useEditorContext } from '../../../editor-context';

export type StateProps = {
  repositoryId: string;
};

export const State = ({ repositoryId }: StateProps) => {
  const { monitor } = useEditorContext();
  const { previewState } = monitor;
  const state = (previewState as any)?.[repositoryId];

  return (
    <Card withBorder>
      <Title order={4}>当前状态</Title>
      <Divider mt={8} mb={8} />

      <Code block>
        $.{repositoryId}: {state ? JSON.stringify(state) : 'undefined'}
      </Code>
    </Card>
  );
};
