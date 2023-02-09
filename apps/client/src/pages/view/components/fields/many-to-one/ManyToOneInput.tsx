import { PlusOutlined } from '@ant-design/icons';
import { UnknownSourceModel } from '@shukun/schema';
import { useMount } from 'ahooks';
import { FormInstance, Input, Tag, Button, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { FunctionComponent, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { SourceModel } from '../../../../../models/source';
import { referenceService } from '../../../../../services/reference';
import { ReferenceModalError } from '../../../../../services/reference/classes/ReferenceModalError';
import { LABEL_ALIGN, LABEL_SPAN } from '../constant';
import { BaseReferenceItem, InputFieldProps } from '../interfaces';

export interface ManyToOneInputProps extends InputFieldProps {
  foreignSources: SourceModel[];
  form: FormInstance<UnknownSourceModel>;
  row: UnknownSourceModel | null;
}

export const ManyToOneInput: FunctionComponent<ManyToOneInputProps> = ({
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
  const [item, setItem] = useState<BaseReferenceItem>();

  const { t } = useTranslation();

  useMount(() => {
    if (!row || !electronForeignName) {
      return;
    }

    const id = row?.[electronName];

    if (!id) {
      return;
    }

    const source = foreignSources.find((source) => source.source._id === id);

    if (!source) {
      return;
    }

    setItem({
      value: source.source._id,
      label: source.source?.[electronForeignName] as string,
    });
  });

  const handleRemove = useCallback(() => {
    setItem(undefined);
    form.setFieldsValue({ [electronName]: null });
  }, [setItem, electronName, form]);

  const handleFinish = useCallback(
    async (selectedRow: UnknownSourceModel[]) => {
      if (selectedRow.length === 0 || !electronForeignName) {
        return;
      }

      const [row] = selectedRow;
      const id = row._id;
      const label = row[electronForeignName];

      if (typeof label !== 'string') {
        return;
      }

      setItem({
        value: id,
        label: label,
      });

      form.setFieldsValue({ [electronName]: id });
    },
    [electronForeignName, form, electronName],
  );

  const handleAdd = useCallback(() => {
    try {
      const excludedIds = item ? [item.value] : [];
      referenceService.openModal({
        modalVisible: true,
        modalLabel: label,
        electronReferenceTo: electronReferenceTo ?? null,
        onFinish: handleFinish,
        selectionType: 'radio',
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
  }, [label, electronReferenceTo, handleFinish, referenceViewName, item]);

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
      {item ? (
        <Tag color="processing" closable={!disabled} onClose={handleRemove}>
          {item?.label}
        </Tag>
      ) : (
        <Button size="small" onClick={handleAdd} disabled={disabled}>
          <PlusOutlined />
        </Button>
      )}
    </FormItem>
  );
};
