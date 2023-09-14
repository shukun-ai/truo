import { UnknownSourceModel } from '@shukun/schema';
import {
  MetadataAttachmentOptions,
  MetadataCurrencyOptions,
  MetadataElectron,
  MetadataSchema,
  ViewSchema,
  ViewTableField,
} from '@shukun/schema';
import { TableColumnsType, TableColumnType } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { useMemo } from 'react';

import {
  defaultSearchValue,
  searchQuery,
  SearchSort,
} from '../../../../services/search';
import { convertSearchOrderToAntdSort } from '../../../../utils/ant-design/sortConverter';
import { ColumnFieldFactory } from '../fields/ColumnFieldFactory';

const INTERNAL_ELECTRON_NAMES = ['_id', 'updatedAt', 'createdAt'];

export function useColumns(
  view: ViewSchema,
  metadata: MetadataSchema,
): TableColumnsType<UnknownSourceModel> {
  const sort = useObservableState(searchQuery.sort$, defaultSearchValue.sort);

  const columns = useMemo<TableColumnsType<UnknownSourceModel>>(() => {
    const antColumns: TableColumnsType<UnknownSourceModel> = [];

    const viewTableFields = view.configurations?.tableFields || [];

    viewTableFields.forEach((viewColumn) => {
      const electron = metadata.electrons.find(
        (electron) => electron.name === viewColumn.electronName,
      );

      if (electron) {
        const antColumn = createElectronColumn(
          metadata,
          viewColumn,
          electron,
          sort ?? null,
        );
        antColumns.push(antColumn);
      } else if (INTERNAL_ELECTRON_NAMES.includes(viewColumn.electronName)) {
        const antColumn = createInternalColumn(
          metadata,
          viewColumn,
          viewColumn.electronName,
          sort ?? null,
        );
        antColumns.push(antColumn);
      }
    });

    return antColumns;
  }, [view.configurations, metadata, sort]);

  return columns;
}

function createElectronColumn(
  metadata: MetadataSchema,
  viewColumn: ViewTableField,
  electron: MetadataElectron,
  sort: SearchSort | null, // TODO: passing sort here is not a good practice, we should inject sort in custom header cell
): TableColumnType<UnknownSourceModel> {
  const sortValue = sort ? sort[electron.name] : null;

  const config: TableColumnType<UnknownSourceModel> = {
    title: viewColumn.label,
    dataIndex: viewColumn.electronName,
    key: viewColumn.name,
    sorter: true,
    sortOrder: sortValue ? convertSearchOrderToAntdSort(sortValue) : undefined,
    render: (value, row) => [
      <ColumnFieldFactory
        key={viewColumn.name}
        type={viewColumn.type}
        name={viewColumn.name}
        label={viewColumn.label}
        viewLink={viewColumn.link}
        tip={undefined}
        electronName={electron.name}
        electronForeignName={
          typeof electron.foreignName === 'string'
            ? electron.foreignName
            : undefined
        }
        electronReferenceTo={
          typeof electron.referenceTo === 'string'
            ? electron.referenceTo
            : undefined
        }
        electronOptions={
          Array.isArray(electron.options) ? electron.options : undefined
        }
        referenceViewName={viewColumn.referenceViewName}
        currencyOptions={electron.currencyOptions as MetadataCurrencyOptions}
        attachmentOptions={
          electron.attachmentOptions as MetadataAttachmentOptions
        }
        row={row}
      />,
    ],
  };

  return config;
}

function createInternalColumn(
  metadata: MetadataSchema,
  viewColumn: ViewTableField,
  electronName: string,
  sort: SearchSort | null, // TODO: passing sort here is not a good practice, we should inject sort in custom header cell
): TableColumnType<UnknownSourceModel> {
  const sortValue = sort ? sort[electronName] : null;

  const config: TableColumnType<UnknownSourceModel> = {
    title: viewColumn.label,
    dataIndex: viewColumn.electronName,
    key: viewColumn.name,
    sorter: true,
    sortOrder: sortValue ? convertSearchOrderToAntdSort(sortValue) : undefined,
    render: (value, row) => [
      <ColumnFieldFactory
        key={viewColumn.name}
        type={viewColumn.type}
        name={viewColumn.name}
        label={viewColumn.label}
        viewLink={viewColumn.link}
        tip={undefined}
        electronName={electronName}
        electronForeignName={undefined}
        electronReferenceTo={undefined}
        electronOptions={undefined}
        referenceViewName={viewColumn.referenceViewName}
        currencyOptions={undefined}
        attachmentOptions={undefined}
        row={row}
      />,
    ],
  };

  return config;
}
