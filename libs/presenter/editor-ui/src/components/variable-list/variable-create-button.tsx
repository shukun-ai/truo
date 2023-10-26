import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useCallback } from 'react';

import { useEditorContext } from '../../editor-context';

import { VariableForm, VariableFormValues } from './variable-form';

export type VariableCreateButtonProps = {
  //
};

export const VariableCreateButton = () => {
  const { dispatch } = useEditorContext();

  const onSubmit = useCallback<(values: VariableFormValues) => void>(
    (values) => {
      try {
        dispatch.variable.create(values.variableId, {});
        modals.closeAll();
      } catch {
        notifications.show({
          title: '变量标识符重复',
          message: '该变量标识符已存在，建议换个名称再次保存',
          color: 'red',
        });
      }
    },
    [dispatch.variable],
  );

  const open = useCallback(() => {
    modals.open({
      title: '新建变量',
      children: (
        <VariableForm
          onSubmit={onSubmit}
          isUniqueId={dispatch.variable.isUniqueId}
        />
      ),
    });
  }, [dispatch.variable.isUniqueId, onSubmit]);

  return (
    <Button
      leftIcon={<IconPlus size="0.9rem" />}
      variant="subtle"
      size="sm"
      onClick={open}
      fullWidth
    >
      新建变量
    </Button>
  );
};
