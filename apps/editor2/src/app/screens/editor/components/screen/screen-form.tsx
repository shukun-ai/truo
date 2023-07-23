import { Badge, Button, Input, Select, TextInput } from '@mantine/core';
import { isNotEmpty, useForm, zodResolver } from '@mantine/form';

import { useObservableState } from 'observable-hooks';
import { useMemo } from 'react';

import { z } from 'zod';

import { PresenterScreenEntity } from '../../../../../repositories/presenter/screen-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { availableSlots } from './internal/available-slots';
import { Slots } from './internal/slots';

export type ScreenFormValue = {
  screenName: string;
  layout: PresenterScreenEntity['layout'];
  slots: PresenterScreenEntity['slots'];
};

export type ScreenFormProps = {
  screenEntity: PresenterScreenEntity | null;
  presenterName: string | undefined;
  onSubmit: (values: ScreenFormValue) => void;
};

export const ScreenForm = ({
  presenterName,
  screenEntity,
  onSubmit,
}: ScreenFormProps) => {
  const app = useAppContext();

  const currentUser = useObservableState(
    app.repositories.authRepository.currentUser$,
    null,
  );

  const form = useForm<ScreenFormValue>({
    initialValues: structuredClone(screenEntity) ?? undefined,
    validate: zodResolver(
      z
        .object({
          screenName: z
            .string()
            .min(1)
            .max(20)
            .regex(/^[a-z0-9_-]*$/, {
              message: '仅支持小写字母、数字、下划线和连字符',
            }),
          layout: z.string().min(1),
          slots: z.record(z.string(), z.string()),
        })
        .refine(
          (value) => {
            const slotStructures = availableSlots[value.layout] ?? [];
            const isEveryPass = slotStructures.every((slotStructure) => {
              if (slotStructure.required) {
                const childValue = value.slots[slotStructure.name];
                return isNotEmpty()(childValue) ? false : true;
              }
              return true;
            });
            return isEveryPass ? true : false;
          },
          { message: '请选择插槽内容' },
        ),
    ),
  });

  const isEditMode = useMemo(() => !!screenEntity, [screenEntity]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
      })}
    >
      <TextInput
        label="页面标识符"
        placeholder="Screen Name"
        data-autofocus
        withAsterisk
        description="页面标识符用于URL识别，请使用符合如下格式：字母 a-z、数字 0-9、下划线或连字符"
        {...form.getInputProps('screenName')}
        disabled={isEditMode}
        mb={8}
      />
      {form.values.screenName && (
        <Badge sx={{ textTransform: 'none' }} mb={8}>
          {`/presenter/${currentUser?.orgName}/${presenterName}/${form.values.screenName}`}
        </Badge>
      )}
      <Select
        label="选择排版结构"
        placeholder="Screen Layout"
        data={[
          { value: 'Dashboard', label: 'Dashboard' },
          { value: 'Workshop', label: 'Workshop' },
        ]}
        withAsterisk
        {...form.getInputProps('layout')}
        mb={8}
      />
      <Slots
        availableSlots={availableSlots}
        layout={form.values.layout}
        {...form.getInputProps('slots')}
      />
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
