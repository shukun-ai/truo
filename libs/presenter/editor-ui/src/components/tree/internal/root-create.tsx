import { Alert, Box, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconAlertCircle } from '@tabler/icons-react';
import { useCallback } from 'react';

import { useEditorContext } from '../../../editor-context';
import {
  WidgetCreation,
  WidgetCreationProps,
} from '../../widget-creation/widget-creation';

import { WIDGET_CREATION_MODAL_SIZE } from './constants';

export type TreeRootCreateProps = {
  //
};

export const TreeRootCreate = () => {
  const { state, dispatch } = useEditorContext();

  const onChildSubmit = useCallback<WidgetCreationProps['onSubmit']>(
    (values) => {
      dispatch.node.addWidget(
        'insert',
        values.widgetTag,
        values.widgetTitle,
        state.rootNodeId,
      );
    },
    [dispatch.node, state.rootNodeId],
  );

  const handleChildCreate = useCallback(() => {
    modals.open({
      title: '新建根级组件',
      size: WIDGET_CREATION_MODAL_SIZE,
      children: (
        <WidgetCreation
          parentWidgetDefinition={null}
          widgetGallery={state.widgetGallery}
          widgetDefinitions={state.widgetDefinitions}
          onSubmit={onChildSubmit}
        />
      ),
    });
  }, [onChildSubmit, state.widgetDefinitions, state.widgetGallery]);

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
