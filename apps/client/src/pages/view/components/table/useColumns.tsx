import {
  MetadataElectron,
  MetadataSchema,
  ViewSchema,
  ViewV2Column,
} from '@shukun/schema';
import { TableColumnsType, TableColumnType } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { useMemo } from 'react';

import { defaultSearchValue, searchQuery } from '../../../../services/search';
import { SortQueryStringValues } from '../../../../services/table/model';
import { ColumnFieldFactory } from '../fields/ColumnFieldFactory';

export function useColumns(
  view: ViewSchema,
  metadata: MetadataSchema,
): TableColumnsType<any> {
  const sort = useObservableState(searchQuery.sort$, defaultSearchValue.sort);

  const columns = useMemo<TableColumnsType<any>>(() => {
    const antColumns: TableColumnsType<any> = [];

    const viewColumns = view.configurations?.v2Columns || [];

    viewColumns.forEach((viewColumn) => {
      const electron = metadata.electrons.find(
        (electron) => electron.name === viewColumn.electronName,
      );

      if (electron) {
        const antColumn = createColumn(
          metadata,
          viewColumn,
          electron,
          sort ?? null,
        );
        antColumns.push(antColumn);
      }
    });

    return antColumns;
  }, [view.configurations, metadata, sort]);

  return columns;
}

function createColumn(
  metadata: MetadataSchema,
  viewColumn: ViewV2Column,
  electron: MetadataElectron,
  sort: SortQueryStringValues | null, // @todo passing sort here is not a good practice, we should inject sort in custom header cell
): TableColumnType<any> {
  const sortValue = sort ? sort[electron.name] : null;

  const config: TableColumnType<any> = {
    title: viewColumn.label,
    dataIndex: viewColumn.electronName,
    key: viewColumn.name,
    sorter: true,
    sortOrder: sortValue ? sortValue : undefined,
    render: (value, row) => [
      <ColumnFieldFactory
        key={viewColumn.name}
        type={viewColumn.type}
        name={viewColumn.name}
        label={viewColumn.label}
        viewLink={viewColumn.link}
        tip={undefined}
        electronName={electron.name}
        electronForeignName={electron.foreignName}
        electronReferenceTo={electron.referenceTo}
        electronOptions={electron.options}
        referenceViewName={viewColumn.referenceViewName}
        currencyOptions={electron.currencyOptions}
        attachmentOptions={electron.attachmentOptions}
        row={row}
      />,
    ],
  };

  return config;
}
