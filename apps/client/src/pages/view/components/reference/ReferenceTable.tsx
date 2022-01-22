import { MetadataSchema, ViewSchema } from '@shukun/schema';
import { useDebounceEffect, useUpdateEffect } from 'ahooks';
import { Pagination, Table as BaseTable } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import {
  currentPage$,
  pageSize$,
  referenceEntities$,
  loading$,
  totalPages$,
  referenceService,
  selectionType$,
  selectedRow$,
} from '../../../../services/reference';
import { initialState } from '../../../../services/reference/store';
import { useColumns } from '../table/useColumns';

export interface ReferenceTableProps {
  view: ViewSchema;
  metadata: MetadataSchema;
}

export const ReferenceTable: FunctionComponent<ReferenceTableProps> = ({
  view,
  metadata,
}) => {
  const columns = useColumns(view, metadata);
  const tableEntities = useObservableState(
    referenceEntities$,
    // TODO: remove ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    initialState.referenceEntities,
  );
  const tableLoading = useObservableState(loading$, initialState.loading);
  const totalPages = useObservableState(totalPages$, initialState.totalPages);
  const currentPage = useObservableState(
    currentPage$,
    initialState.currentPage,
  );
  const pageSize = useObservableState(pageSize$, initialState.pageSize);

  useUpdateEffect(() => {
    referenceService.set({ currentPage: 1 });
  }, [view.name]);

  useDebounceEffect(
    () => {
      const skip = (currentPage - 1) * pageSize;
      referenceService.findMany(metadata, { limit: pageSize, skip });
    },
    [metadata, currentPage, pageSize],
    { wait: 100 },
  );

  useDebounceEffect(
    () => {
      referenceService.resetFilters();
    },
    [view, metadata],
    { wait: 50 },
  );

  const selectionType = useObservableState(
    selectionType$,
    initialState.selectionType,
  );

  const selectedRow = useObservableState(
    selectedRow$,
    initialState.selectedRow,
  );

  const selectedRowKeys = useMemo(() => {
    return selectedRow.map((item) => item._id);
  }, [selectedRow]);

  const handleSelectChange = useCallback((selectedRowKeys, selectedRow) => {
    referenceService.set({
      selectedRow,
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
          scroll={{ y: 500 }}
          rowSelection={{
            columnWidth: 64,
            type: selectionType,
            hideSelectAll: true,
            selectedRowKeys,
            onChange: handleSelectChange,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Pagination
          total={totalPages}
          current={currentPage}
          pageSize={pageSize}
          onChange={(currentPage, pageSize) => {
            referenceService.set({ currentPage, pageSize });
          }}
        />
      </div>
    </div>
  );
};
