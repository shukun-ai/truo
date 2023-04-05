import { PlusOutlined } from '@ant-design/icons';
import { LegacyFunctionComponent } from '@shukun/component';
import { UnknownSourceModel } from '@shukun/schema';
import { useMount } from 'ahooks';
import { FormInstance, Input, Tag, Button, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import uniqBy from 'lodash/uniqBy';
import React, { FunctionComponent, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { SourceModel } from '../../../../../models/source';
import { referenceService } from '../../../../../services/reference';
import { ReferenceModalError } from '../../../../../services/reference/classes/ReferenceModalError';
import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { BaseReferenceItem, InputFieldProps } from '../interfaces';

export interface ManyToManyInputProps extends InputFieldProps {
  foreignSources: SourceModel[];
  form: FormInstance<UnknownSourceModel>;
  row: UnknownSourceModel | null;
}

export const ManyToManyInput: LegacyFunctionComponent<ManyToManyInputProps> = ({
  foreignSources,
  form,
  row,
  label,
  electronName,
  electronForeignName,
  electronReferenceTo,
  referenceViewName,
  required,
  disabled,
  tip,
}) => {
  const [items, setItems] = useState<BaseReferenceItem[]>([]);

  const { t } = useTranslation();

  useMount(() => {
    if (!row || !electronForeignName) {
      return;
    }

    const ids = row?.[electronName];

    if (!Array.isArray(ids)) {
      return;
    }

    const value = foreignSources
      .filter((source) => ids.includes(source.source._id))
      .map((source) => source.source);

    const item: BaseReferenceItem[] = value.map((child) => ({
      value: child._id,
      label: child?.[electronForeignName] as string,
    }));

    setItems(item);
  });

  const handleRemove = useCallback(
    (sourceId: string) => {
      const index = items.findIndex((item) => item.value === sourceId);

      if (index >= 0) {
        items.splice(index, 1);
        const newIds = items.map((item) => item.value);

        setItems(items);
        form.setFieldsValue({ [electronName]: newIds });
      }
    },
    [setItems, electronName, form, items],
  );

  const handleFinish = useCallback(
    async (selectedRow: UnknownSourceModel[]) => {
      if (selectedRow.length === 0 || !electronForeignName) {
        return;
      }

      const newItems: BaseReferenceItem[] = selectedRow.map((child) => {
        const id = child._id;
        const label = child[electronForeignName];

        return {
          value: id,
          label: label as string,
        };
      });

      const mergedItems = [...items, ...newItems];
      const uniqItems = uniqBy(mergedItems, 'value');

      setItems(uniqItems);
      form.setFieldsValue({
        [electronName]: uniqItems.map((item) => item.value),
      });
    },
    [electronForeignName, form, electronName, items],
  );

  const handleAdd = useCallback(() => {
    try {
      const excludedIds = items.map((item) => item.value);
      referenceService.openModal({
        modalVisible: true,
        modalLabel: label,
        electronReferenceTo: electronReferenceTo ?? null,
        onFinish: handleFinish,
        selectionType: 'checkbox',
        viewName: referenceViewName,
        excludedIds,
      });
    } catch (error) {
      if (error instanceof ReferenceModalError) {
        message.error(error.message);
      } else {
        throw error;
      }
    }
  }, [label, electronReferenceTo, handleFinish, referenceViewName, items]);

  return (
    <FormItem
      name={electronName}
      label={label}
      required={required}
      rules={[{ required, message: t('fields.requiredError', { label }) }]}
      labelAlign={LABEL_ALIGN}
      labelCol={{ span: LABEL_SPAN }}
      tooltip={tip}
    >
      <Input type="hidden" disabled={disabled} />

      {items?.map((item) => (
        <Tag
          color="processing"
          key={item.value}
          closable={!disabled}
          onClose={() => handleRemove(item.value)}
        >
          {item.label}
        </Tag>
      ))}
      <Button size="small" onClick={handleAdd} disabled={disabled}>
        <PlusOutlined />
      </Button>
    </FormItem>
  );
};
