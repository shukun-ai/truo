import { ViewFieldType } from '@shukun/schema';
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
import { MixedForm } from './mixed/MixedForm';
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
  if (props.type === ViewFieldType.Text) {
    return (
      <FormContext.Consumer>
        {({ form, row }) => form && <TextForm {...props} form={form} />}
      </FormContext.Consumer>
    );
  }

  if (props.type === ViewFieldType.NameText) {
    return <NameTextForm {...props} />;
  }

  if (props.type === ViewFieldType.LargeText) {
    return <LargeTextForm {...props} />;
  }

  if (props.type === ViewFieldType.Mixed) {
    return (
      <FormContext.Consumer>
        {({ form }) => form && <MixedForm form={form} {...props} />}
      </FormContext.Consumer>
    );
  }

  if (props.type === ViewFieldType.Boolean) {
    return <BooleanForm {...props} />;
  }

  if (props.type === ViewFieldType.Integer) {
    return <IntegerForm {...props} />;
  }

  if (props.type === ViewFieldType.Float) {
    return <FloatForm {...props} />;
  }

  if (props.type === ViewFieldType.Currency) {
    return <CurrencyForm {...props} />;
  }

  if (props.type === ViewFieldType.Password) {
    return (
      <FormContext.Consumer>
        {({ mode }) => <PasswordForm {...props} mode={mode} />}
      </FormContext.Consumer>
    );
  }

  if (props.type === ViewFieldType.SingleSelect) {
    return <SingleSelectForm {...props} />;
  }

  if (props.type === ViewFieldType.MultiSelect) {
    return <MultiSelectForm {...props} />;
  }

  if (props.type === ViewFieldType.DateTime) {
    return <DateTimeForm {...props} />;
  }

  if (props.type === ViewFieldType.Attachment) {
    return <AttachmentForm {...props} />;
  }

  if (props.type === ViewFieldType.Owner) {
    return <OwnerForm {...props} />;
  }

  if (props.type === ViewFieldType.ManyToOne) {
    return (
      <FormContext.Consumer>
        {({ form, row }) =>
          form && <ManyToOneForm form={form} row={row} {...props} />
        }
      </FormContext.Consumer>
    );
  }

  if (props.type === ViewFieldType.ManyToMany) {
    return (
      <FormContext.Consumer>
        {({ form, row }) =>
          form && <ManyToManyForm form={form} row={row} {...props} />
        }
      </FormContext.Consumer>
    );
  }

  if (props.type === ViewFieldType.Role) {
    return <RoleForm {...props} />;
  }

  return <div>未内置该格式</div>;
};
