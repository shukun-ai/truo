import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export const NonContainerTip = () => {
  return (
    <Alert icon={<IconInfoCircle />} title="请先选择页面">
      在上方选择或者创建新的页面，然后进行相关操作
      <br />
      一个容器有多个组件、状态、观察器组成
    </Alert>
  );
};
