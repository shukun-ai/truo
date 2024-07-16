import { LegacyFunctionComponent } from '@shukun/component';
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
  defaultSearchValue,
  searchService,
  searchQuery,
} from '../../../../services/search';
import {
  tableActiveIds$,
  tableEntities$,
  tableLoading$,
  tableService,
} from '../../../../services/table';
import { initialState } from '../../../../services/table/store';
import { convertAntdSortToSearchOrder } from '../../../../utils/ant-design/sortConverter';
import { Filter } from '../filter/Filter';

import { TableCustomActions } from './TableCustomActions';

import { TableRibbon } from './TableRibbon';
import { useColumns } from './useColumns';

export interface TableProps {
  view: ViewSchema;
  metadata: MetadataSchema;
}

export const Table: LegacyFunctionComponent<TableProps> = ({
  view,
  metadata,
}) => {
  const disabledLinkText = false;
  const columns = useColumns(view, metadata, disabledLinkText);
  const tableEntities = useObservableState(tableEntities$);
  const tableLoading = useObservableState(tableLoading$);

  const totalCount = useObservableState(
    searchQuery.totalCount$,
    defaultSearchValue.totalCount,
  );
  const currentPage = useObservableState(
    searchQuery.currentPage$,
    // TODO: remove ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    initialState.currentPage,
  );
  const pageSize = useObservableState(
    searchQuery.pageSize$,
    defaultSearchValue.pageSize,
  );
  const filter = useObservableState(
    searchQuery.filter$,
    defaultSearchValue.filter,
  );
  const sort = useObservableState(searchQuery.sort$, defaultSearchValue.sort);

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

      if (!sorter.order) {
        searchService.resetSearchSort(null);
        return;
      }

      const order = convertAntdSortToSearchOrder(sorter.order);

      searchService.updateSearchSort(
        {
          [sorter.field]: order,
        },
        null,
      );
    },
    [],
  );

  const selectedIds = useObservableState(tableActiveIds$);

  const handleSelectedIdsChanged = useCallback(
    (selectedRowKeys: React.Key[]) => {
      tableService.setSelectedIds(selectedRowKeys as string[]);
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
        viewRibbons={view.configurations?.tableRibbons || []}
        view={view}
      />
      <TableCustomActions view={view} metadata={metadata} />
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
          viewTableFields={view.configurations?.tableFields || []}
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
