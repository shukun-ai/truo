import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export const EmptyTip = () => {
  return (
    <Alert icon={<IconInfoCircle />} title="请先选择容器">
      在上方选择或者创建新的容器，然后操作相关的组件树。
      <br />
      一个容器有多条组件树、数据仓库、观察器组成。
    </Alert>
  );
};
