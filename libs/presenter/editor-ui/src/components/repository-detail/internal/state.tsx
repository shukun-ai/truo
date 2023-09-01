import { Alert, Card, Divider, Title } from '@mantine/core';
import { Icon } from '@shukun/component';

export type StateProps = {
  //
};

export const State = () => {
  return (
    <Card withBorder>
      <Title order={4}>当前状态</Title>
      <Divider mt={8} mb={8} />

      <Alert
        title="暂未开放，用于展示预览应用中的当前数据仓库的状态"
        icon={<Icon type="info" />}
        mb={8}
        children={null}
      />
    </Card>
  );
};
