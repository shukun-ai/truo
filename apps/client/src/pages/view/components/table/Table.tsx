import { MetadataSchema, ViewSchema } from '@shukun/schema';
import { useDebounceEffect } from 'ahooks';
import { Pagination, Table as BaseTable, TablePaginationConfig } from 'antd';
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/lib/table/interface';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback } from 'react';

import {
  currentPage$,
  defaultSearchValue,
  filter$,
  searchService,
  pageSize$,
  sort$,
  totalCount$,
} from '../../../../services/search';
import {
  tableActiveIds$,
  tableEntities$,
  tableLoading$,
  tableService,
} from '../../../../services/table';
import { SortQueryStringType } from '../../../../services/table/model';
import { initialState } from '../../../../services/table/store';
import { Filter } from '../filter/Filter';

import { TableRibbon } from './TableRibbon';
import { useColumns } from './useColumns';

export interface TableProps {
  view: ViewSchema;
  metadata: MetadataSchema;
}

export const Table: FunctionComponent<TableProps> = ({ view, metadata }) => {
  const columns = useColumns(view, metadata);
  const tableEntities = useObservableState(tableEntities$);
  const tableLoading = useObservableState(tableLoading$);

  const totalCount = useObservableState(
    totalCount$,
    defaultSearchValue.totalCount,
  );
  const currentPage = useObservableState(
    currentPage$,
    // TODO: remove ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    initialState.currentPage,
  );
  const pageSize = useObservableState(pageSize$, defaultSearchValue.pageSize);
  const filter = useObservableState(filter$, defaultSearchValue.filter);
  const sort = useObservableState(sort$, defaultSearchValue.sort);

  // @todo it's not best practice, should listen Change in custom header cell component
  const handleSortChange = useCallback(
    (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<any> | SorterResult<any>[],
      extra: TableCurrentDataSource<any>,
    ) => {
      if (extra.action !== 'sort' || Array.isArray(sorter)) {
        return;
      }

      if (typeof sorter.field !== 'string') {
        return;
      }

      searchService.updateSearchSort(
        {
          [sorter.field]: sorter.order as SortQueryStringType,
        },
        view.search ?? null,
      );
    },
    [view.search],
  );

  const selectedIds = useObservableState(tableActiveIds$);

  const handleSelectedIdsChanged = useCallback((selectedRowKeys) => {
    tableService.setSelectedIds(selectedRowKeys);
  }, []);

  useDebounceEffect(
    () => {
      tableService.findMany(view, metadata);
    },
    [view, metadata, currentPage, pageSize, filter, sort],
    { wait: 100 },
  );

  return (
    <>
      <TableRibbon
        metadata={metadata}
        viewRibbons={view.configurations?.v2ColumnRibbons || []}
        view={view}
      />
      <div
        style={{
          background: '#fff',
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 12,
        }}
      >
        <Filter
          metadata={metadata}
          viewColumns={view.configurations?.v2Columns || []}
          viewSearch={view.search}
        />
      </div>
      <div
        className="global-view-table"
        style={{
          flex: 1,
          marginBottom: 12,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <BaseTable
          columns={columns}
          dataSource={tableEntities}
          loading={tableLoading}
          rowKey="_id"
          pagination={false}
          size="small"
          onChange={handleSortChange}
          rowSelection={{
            columnWidth: 64,
            selectedRowKeys: selectedIds,
            onChange: handleSelectedIdsChanged,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingBottom: 12,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <Pagination
          total={totalCount}
          current={currentPage}
          pageSize={pageSize}
          onChange={(currentPage, pageSize) => {
            searchService.updateSearchPagination({ currentPage, pageSize });
          }}
          showTotal={() => `共 ${totalCount}\u00A0条`}
          showQuickJumper
        />
      </div>
    </>
  );
};
