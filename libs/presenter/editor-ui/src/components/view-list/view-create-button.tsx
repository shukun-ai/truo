import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useCallback } from 'react';

import { useEditorContext } from '../../editor-context';

import { ViewForm, ViewFormValues } from './view-form';

export type ViewCreateButtonProps = {
  //
};

export const ViewCreateButton = () => {
  const { dispatch } = useEditorContext();

  const onSubmit = useCallback<(values: ViewFormValues) => void>(
    (values) => {
      try {
        dispatch.view.create(values.viewName);
        modals.closeAll();
      } catch {
        notifications.show({
          title: '视图标识符重复',
          message: '该视图标识符已存在，建议换个名称再次保存',
          color: 'red',
        });
      }
    },
    [dispatch.view],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建视图',
      children: (
        <ViewForm onSubmit={onSubmit} isUnique={dispatch.view.isUnique} />
      ),
    });
  }, [dispatch.view.isUnique, onSubmit]);

  return (
    <Button
      leftIcon={<IconPlus size="0.9rem" />}
      variant="subtle"
      size="sm"
      onClick={open}
      fullWidth
    >
      新建视图
    </Button>
  );
};
