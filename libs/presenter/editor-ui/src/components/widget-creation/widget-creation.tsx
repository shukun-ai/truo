import { Box, Button, Divider, Group, Switch, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { modals } from '@mantine/modals';
import { WidgetGallery, WidgetGalleryInput } from '@shukun/component';
import { WidgetSchema } from '@shukun/schema';
import { useMemo } from 'react';
import { z } from 'zod';

export type WidgetCreationProps = {
  parentWidgetDefinition: WidgetSchema | null;
  widgetDefinitions: Record<string, WidgetSchema>;
  widgetGallery: WidgetGallery;
  onSubmit: (values: { widgetTag: string; widgetTitle?: string }) => void;
};

export const WidgetCreation = ({
  parentWidgetDefinition,
  widgetDefinitions,
  widgetGallery,
  onSubmit,
}: WidgetCreationProps) => {
  const form = useForm({
    initialValues: {
      widgetTag: '',
      widgetTitle: '',
    },
    validate: zodResolver(
      z
        .object({
          widgetTag: z.string(),
        })
        .required(),
    ),
  });

  const widgetTitleProps = form.getInputProps('widgetTitle');

  const switchStatus = useMemo<boolean>(() => {
    return !widgetTitleProps.value;
  }, [widgetTitleProps.value]);

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
          parentWidgetDefinition={parentWidgetDefinition}
          widgetDefinitions={widgetDefinitions}
          widgetGallery={widgetGallery}
          {...form.getInputProps('widgetTag')}
        />
      </Box>
      <Group>
        <Switch
          label="自增显示名"
          checked={switchStatus}
          onChange={(checked) => {
            if (checked) {
              form.setFieldValue('widgetTitle', '');
            }
          }}
        />
        <Divider orientation="vertical" />
        <TextInput
          label="自定义显示名"
          placeholder="输入显示名进行自定义，为空保持自增"
          sx={{ minWidth: 300 }}
          {...form.getInputProps('widgetTitle')}
        />
      </Group>
      <Button type="submit" fullWidth mt="md">
        新建组件
      </Button>
    </form>
  );
};
