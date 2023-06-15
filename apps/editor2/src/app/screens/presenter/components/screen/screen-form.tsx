import { Badge, Button, Select, SelectItem, TextInput } from '@mantine/core';
import { isNotEmpty, matches, useForm } from '@mantine/form';
import { PresenterScreen } from '@shukun/schema';

import { cloneDeep, omit } from 'lodash';
import { useObservableState } from 'observable-hooks';
import { useEffect, useMemo } from 'react';

import { PresenterScreenEntity } from '../../../../../repositories/presenter/screen-ref';
import { useAppContext } from '../../../../contexts/app-context';

export type ScreenFormValues = { screenId: string } & PresenterScreen;

export type ScreenFormProps = {
  screenEntity: PresenterScreenEntity | null;
  presenterName: string | undefined;
  onSubmit: (values: ScreenFormValues) => void;
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

  const allContainers = useObservableState(
    app.repositories.presenterRepository.containerRepository.allContainers$,
    [],
  );

  const containerOptions = useMemo<SelectItem[]>(() => {
    return allContainers.map((container) => ({
      label: container.id,
      value: container.id,
    }));
  }, [allContainers]);

  const form = useForm<ScreenFormValues>({
    initialValues: {
      // Add slots and any ignore for complex object type
      slots: {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    validate: {
      screenId: (value) => {
        return (
          matches(
            /^[a-z0-9_-]{1,20}$/,
            '仅支持小写字母、数字、下划线和连字符,长度大于1小于20',
          )(value) &&
          app.repositories.presenterRepository.screenRepository.isUniqueId(
            value,
          )
        );
      },
      layout: isNotEmpty('请选择排版的类型'),
      slots: (value, values) => {
        const slotStructures = slotMaps[values.layout] ?? [];
        const isEveryPass = slotStructures.every((slotStructure) => {
          if (slotStructure.required) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const childValue = (value as any)[slotStructure.name];
            return isNotEmpty()(childValue) ? false : true;
          }
          return true;
        });
        return isEveryPass ? null : '请选择插槽内容';
      },
    },
  });

  useEffect(() => {
    if (screenEntity) {
      form.setValues(
        cloneDeep({
          ...omit(screenEntity, 'id'),
          screenId: screenEntity.id,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenEntity]);

  const isEditMode = useMemo(() => !!screenEntity, [screenEntity]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
      })}
    >
      <TextInput
        label="路由标识符"
        placeholder="Screen Id"
        data-autofocus
        withAsterisk
        description="路由标识符用于URL识别，请使用符合如下格式：字母 a-z、数字 0-9、下划线或连字符"
        {...form.getInputProps('screenId')}
        disabled={isEditMode}
      />
      {form.values.screenId && (
        <Badge sx={{ textTransform: 'none' }}>
          {`/presenter/${currentUser?.orgName}/${presenterName}/${form.values.screenId}`}
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
      />
      {slotMaps?.[form.values.layout]?.map((slot) => (
        <Select
          label={`插槽：${slot.name}`}
          placeholder={slot.name}
          data={containerOptions}
          withAsterisk={slot.required}
          {...form.getInputProps(`slots.${slot.name}`)}
          error={slot.required && form.getInputProps('slots').error}
          clearable
        />
      ))}
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};

type SlotStructure = {
  name: string;
  required: boolean;
};

const slotMaps: Record<PresenterScreen['layout'], SlotStructure[]> = {
  Dashboard: [
    {
      name: 'main',
      required: true,
    },
    {
      name: 'menu',
      required: false,
    },
  ],
  Workshop: [
    {
      name: 'main',
      required: true,
    },
    {
      name: 'menu',
      required: false,
    },
  ],
};
