import { Alert, Box, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconAlertCircle } from '@tabler/icons-react';
import { useCallback } from 'react';

import { ROOT_NODE_ID } from '../../../../../../repositories/presenter/presenter-store';
import { useAppContext } from '../../../../../contexts/app-context';

import { NodeCreateForm, NodeCreateFormProps } from './more-button';

export type TreeRootCreateProps = {
  //
};

export const TreeRootCreate = () => {
  const app = useAppContext();

  const onChildSubmit = useCallback<NodeCreateFormProps['onSubmit']>(
    (values) => {
      app.repositories.presenterRepository.treeRepository.addWidget(
        'insert',
        values.widgetTag,
        values.widgetTitle,
        ROOT_NODE_ID,
      );
    },
    [app.repositories.presenterRepository.treeRepository],
  );

  const handleChildCreate = useCallback(() => {
    modals.open({
      title: '新建子级组件',
      children: <NodeCreateForm onSubmit={onChildSubmit} />,
    });
  }, [onChildSubmit]);

  return (
    <Box sx={{ padding: 12 }}>
      <Alert icon={<IconAlertCircle size="1rem" />} sx={{ marginBottom: 6 }}>
        点击创建组件创建你的第一个组件
      </Alert>
      <Button onClick={handleChildCreate} fullWidth>
        新建组件
      </Button>
    </Box>
  );
};
