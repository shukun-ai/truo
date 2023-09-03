import { Card, Code, Divider, Title } from '@mantine/core';

import { useEditorContext } from '../../../editor-context';

export type StateProps = {
  repositoryId: string;
};

export const State = ({ repositoryId }: StateProps) => {
  const { devtool } = useEditorContext();
  const { logs } = devtool;
  const state = (logs.state as any)?.[repositoryId];

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
