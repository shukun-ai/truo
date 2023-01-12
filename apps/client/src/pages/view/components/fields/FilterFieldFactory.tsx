import { ViewFieldType } from '@shukun/schema';
import React, { FunctionComponent } from 'react';

import { BooleanFilter } from './boolean/BooleanFilter';
import { DateTimeFilter } from './date-time/DateTimeFilter';
import { IntegerFilter } from './integer/IntegerFilter';
import { FilterFieldProps } from './interfaces';
import { ManyToOneFilter } from './many-to-one/ManyToOneFilter';
import { SingleSelectFilter } from './single-select/SingleSelectFilter';
import { TextFilter } from './text/TextFilter';

export const FilterFieldFactory: FunctionComponent<FilterFieldProps> = (
  props,
) => {
  if (
    props.type === ViewFieldType.Text ||
    props.type === ViewFieldType.LinkText ||
    props.type === ViewFieldType.LargeText ||
    props.type === ViewFieldType.NameText
  ) {
    return <TextFilter {...props} />;
  }

  if (props.type === ViewFieldType.Boolean) {
    return <BooleanFilter {...props} />;
  }

  if (
    props.type === ViewFieldType.Integer ||
    props.type === ViewFieldType.Float ||
    props.type === ViewFieldType.Currency
  ) {
    return <IntegerFilter {...props} />;
  }

  if (
    props.type === ViewFieldType.SingleSelect ||
    props.type === ViewFieldType.MultiSelect
  ) {
    return <SingleSelectFilter {...props} />;
  }

  if (props.type === ViewFieldType.DateTime) {
    return <DateTimeFilter {...props} />;
  }

  // if (props.type === ViewFieldType.Attachment) {
  //   return <AttachmentField {...props} />;
  // }

  // if (props.type === ViewFieldType.Owner) {
  //   return <OwnerField {...props} />;
  // }

  if (props.type === ViewFieldType.ManyToOne) {
    return <ManyToOneFilter {...props} />;
  }

  // if (props.type === ViewFieldType.ManyToMany) {
  //   return <ManyToManyField {...props} />;
  // }

  // if (props.type === ViewFieldType.Role) {
  //   return <RoleField {...props} />;
  // }

  // if (props.type === ViewFieldType.LinkText) {
  //   return <LinkTextField {...props} />;
  // }

  return <div></div>;
};
