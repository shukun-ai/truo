import {
  Alert,
  Box,
  Button,
  Divider,
  Group,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { modals } from '@mantine/modals';
import { Icon, WidgetGallery, WidgetGalleryInput } from '@shukun/component';
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
      z.object({
        widgetTag: z.string().min(1, { message: '请选择一个组件' }),
      }),
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
        {parentWidgetDefinition?.allowedChildTags?.includes('*') || (
          <Alert color="orange" icon={<Icon type="info" />} mb={8}>
            置灰组件无法被选择，因为当前父组件不支持置灰组件作为下级组件。
          </Alert>
        )}
        <WidgetGalleryInput
          parentWidgetDefinition={parentWidgetDefinition}
          widgetDefinitions={widgetDefinitions}
          widgetGallery={widgetGallery}
          {...form.getInputProps('widgetTag')}
        />
        <Text color="red" size="sm">
          {form.getInputProps('widgetTag').error}
        </Text>
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
