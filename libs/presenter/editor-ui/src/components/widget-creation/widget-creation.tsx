import { Button, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { WidgetSchema } from '@shukun/schema';
import { useEffect, useMemo } from 'react';

export type WidgetCreationProps = {
  widgetDefinitions: Record<string, WidgetSchema>;
  onSubmit: (values: { widgetTag: string; widgetTitle: string }) => void;
};

export const WidgetCreation = ({
  widgetDefinitions,
  onSubmit,
}: WidgetCreationProps) => {
  const form = useForm({
    initialValues: {
      widgetTag: '',
      widgetTitle: '',
    },
    validate: {
      widgetTag: (value) => {
        if (!value) {
          return '请选择新建组件的类型';
        } else {
          return null;
        }
      },
      widgetTitle: (value) => (value ? null : '请输入组件显示名'),
    },
  });

  const options = useMemo(() => {
    const options = Object.entries(widgetDefinitions).map(([id]) => ({
      value: id,
      label: id,
    }));
    return [{ value: '', label: '请选择组件' }, ...options];
  }, [widgetDefinitions]);

  useEffect(() => {
    if (!form.values.widgetTitle) {
      form.setFieldValue('widgetTitle', form.values.widgetTag);
    }
    // @remark The form.values.widgetTag is changed, we just give this field a recommend name.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.widgetTag]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
        modals.closeAll();
      })}
    >
      <Select
        label="选择组件"
        placeholder="选择组件"
        data={options}
        withAsterisk
        withinPortal
        {...form.getInputProps('widgetTag')}
      />
      <TextInput
        label="组件显示名"
        placeholder="Widget title"
        withAsterisk
        {...form.getInputProps('widgetTitle')}
      />
      <Button type="submit" fullWidth mt="md">
        新建组件
      </Button>
    </form>
  );
};
