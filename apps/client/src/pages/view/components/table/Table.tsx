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
  defaultFilterValue,
  filter$,
  filterService,
  pageSize$,
  sort$,
  totalCount$,
} from '../../../../services/filter';
import {
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
    defaultFilterValue.totalCount,
  );
  const currentPage = useObservableState(
    currentPage$,
    // TODO: remove ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    initialState.currentPage,
  );
  const pageSize = useObservableState(pageSize$, defaultFilterValue.pageSize);
  const filter = useObservableState(filter$, defaultFilterValue.filter);
  const sort = useObservableState(sort$, defaultFilterValue.sort);

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

      filterService.updateSort({
        [sorter.field]: sorter.order as SortQueryStringType,
      });
    },
    [],
  );

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
            filterService.updatePagination({ currentPage, pageSize });
          }}
          showTotal={() => `共 ${totalCount}\u00A0条`}
          showQuickJumper
        />
      </div>
    </>
  );
};
