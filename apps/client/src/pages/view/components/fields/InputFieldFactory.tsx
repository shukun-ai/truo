import { ViewV2FieldType } from '@shukun/schema';
import React, { FunctionComponent } from 'react';

import { FormContext } from '../form/FormContext';

import { AttachmentForm } from './attachment/AttachmentForm';
import { BooleanForm } from './boolean/BooleanForm';
import { CurrencyForm } from './currency/CurrencyForm';
import { DateTimeForm } from './date-time/DateTimeForm';
import { FloatForm } from './float/FloatForm';
import { IntegerForm } from './integer/IntegerForm';
import { InputFieldProps } from './interfaces';
import { LargeTextForm } from './large-text/LargeTextForm';
import { ManyToManyForm } from './many-to-many/ManyToManyForm';
import { ManyToOneForm } from './many-to-one/ManyToOneForm';
import { MultiSelectForm } from './multi-select/MultiSelectForm';
import { NameTextForm } from './name-text/NameTextForm';
import { OwnerForm } from './owner/OwnerForm';
import { PasswordForm } from './password/PasswordForm';
import { RoleForm } from './role/RoleForm';
import { SingleSelectForm } from './single-select/SingleSelectForm';
import { TextForm } from './text/TextForm';

export const InputFieldFactory: FunctionComponent<InputFieldProps> = (
  props,
) => {
  if (props.type === ViewV2FieldType.Text) {
    return <TextForm {...props} />;
  }

  if (props.type === ViewV2FieldType.NameText) {
    return <NameTextForm {...props} />;
  }

  if (props.type === ViewV2FieldType.LargeText) {
    return <LargeTextForm {...props} />;
  }

  if (props.type === ViewV2FieldType.Boolean) {
    return <BooleanForm {...props} />;
  }

  if (props.type === ViewV2FieldType.Integer) {
    return <IntegerForm {...props} />;
  }

  if (props.type === ViewV2FieldType.Float) {
    return <FloatForm {...props} />;
  }

  if (props.type === ViewV2FieldType.Currency) {
    return <CurrencyForm {...props} />;
  }

  if (props.type === ViewV2FieldType.Password) {
    return (
      <FormContext.Consumer>
        {({ mode }) => <PasswordForm {...props} mode={mode} />}
      </FormContext.Consumer>
    );
  }

  if (props.type === ViewV2FieldType.SingleSelect) {
    return <SingleSelectForm {...props} />;
  }

  if (props.type === ViewV2FieldType.MultiSelect) {
    return <MultiSelectForm {...props} />;
  }

  if (props.type === ViewV2FieldType.DateTime) {
    return <DateTimeForm {...props} />;
  }

  if (props.type === ViewV2FieldType.Attachment) {
    return <AttachmentForm {...props} />;
  }

  if (props.type === ViewV2FieldType.Owner) {
    return <OwnerForm {...props} />;
  }

  if (props.type === ViewV2FieldType.ManyToOne) {
    return (
      <FormContext.Consumer>
        {({ form, row }) =>
          form && <ManyToOneForm form={form} row={row} {...props} />
        }
      </FormContext.Consumer>
    );
  }

  if (props.type === ViewV2FieldType.ManyToMany) {
    return (
      <FormContext.Consumer>
        {({ form, row }) =>
          form && <ManyToManyForm form={form} row={row} {...props} />
        }
      </FormContext.Consumer>
    );
  }

  if (props.type === ViewV2FieldType.Role) {
    return <RoleForm {...props} />;
  }

  return <div>未内置该格式</div>;
};
