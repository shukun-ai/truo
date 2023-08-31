import { Box, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { WidgetGallery, WidgetGalleryInput } from '@shukun/component';
import { WidgetSchema } from '@shukun/schema';
import { useEffect } from 'react';

export type WidgetCreationProps = {
  widgetDefinitions: Record<string, WidgetSchema>;
  widgetGallery: WidgetGallery;
  onSubmit: (values: { widgetTag: string; widgetTitle: string }) => void;
};

export const WidgetCreation = ({
  widgetDefinitions,
  widgetGallery,
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
      <Box
        sx={{
          border: 'solid 1px #eee',
          padding: 12,
          borderRadius: 4,
          maxHeight: '80%',
          overflowY: 'scroll',
        }}
        mb={12}
      >
        <WidgetGalleryInput
          parentWidgetDefinition={null}
          widgetDefinitions={widgetDefinitions}
          widgetGallery={widgetGallery}
          {...form.getInputProps('widgetTag')}
        />
      </Box>
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
