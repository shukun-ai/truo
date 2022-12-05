import {
  MetadataFieldType,
  MetadataSchema,
  ViewV2Column,
} from '@shukun/schema';
import { ReactText } from 'react';

import {
  FilterQueryStringValues,
  FilterRawValues,
} from '../../../../services/table/model';
import { BooleanChoose } from '../fields/boolean/BooleanFilter';

export function convertRawToQueryString(
  values: FilterRawValues,
  metadata: MetadataSchema,
  viewColumns: ViewV2Column[],
): FilterQueryStringValues {
  const newValues: FilterQueryStringValues = {};
  return viewColumns.reduce((previous, current) => {
    const electron = metadata.electrons.find(
      (electron) => electron.name === current.electronName,
    );

    if (!electron) {
      return previous;
    }

    return {
      ...previous,
      ...convertViewColumn(values, electron.name, electron.fieldType),
    };
  }, newValues);
}

export function convertViewColumn(
  values: FilterRawValues,
  electronName: string,
  electronType: MetadataFieldType,
): FilterQueryStringValues {
  const value = values[electronName];

  if (!value) {
    return {};
  }

  if (
    Array.isArray(value) &&
    value.length > 0 &&
    [
      MetadataFieldType.ManyToMany,
      MetadataFieldType.ManyToOne,
      MetadataFieldType.MultiSelect,
      MetadataFieldType.SingleSelect,
      MetadataFieldType.Owner,
      MetadataFieldType.Role,
    ].includes(electronType)
  ) {
    return {
      [electronName]: { $in: value },
    };
  }

  if (
    typeof value === 'string' &&
    [MetadataFieldType.Boolean].includes(electronType)
  ) {
    if (value === BooleanChoose.Yes) {
      return {
        [electronName]: true,
      };
    } else if (value === BooleanChoose.No) {
      return {
        [electronName]: false,
      };
    } else {
      return {};
    }
  }

  if (
    typeof value === 'string' &&
    [
      MetadataFieldType.Text,
      MetadataFieldType.NameText,
      MetadataFieldType.LargeText,
    ].includes(electronType)
  ) {
    return {
      [electronName]: { $like: value },
    };
  }

  if (
    typeof value === 'number' &&
    [
      MetadataFieldType.Integer,
      MetadataFieldType.Float,
      MetadataFieldType.Currency,
    ].includes(electronType)
  ) {
    return {
      [electronName]: value,
    };
  }

  return {};
}

export function convertQueryStringToRaw(
  filters: FilterQueryStringValues,
  metadata: MetadataSchema,
  viewColumns: ViewV2Column[],
): FilterRawValues {
  const newValues: FilterRawValues = {};
  return viewColumns.reduce((previous, current) => {
    const electron = metadata.electrons.find(
      (electron) => electron.name === current.electronName,
    );

    if (!electron) {
      return previous;
    }

    const value = filters[electron.name];

    if (!value) {
      return previous;
    }

    let newValue: ReactText | ReactText[];

    if (typeof value === 'string' || typeof value === 'number') {
      newValue = value;
    } else if (typeof value === 'boolean') {
      newValue = value ? BooleanChoose.Yes : BooleanChoose.No;
    } else {
      newValue = Object.values(value)[0];
    }

    return {
      ...previous,
      [electron.name]: newValue,
    };
  }, newValues);
}
