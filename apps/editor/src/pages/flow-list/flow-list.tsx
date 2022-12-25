import { FlowSchema } from '@shukun/schema';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { Paper } from '../../components/paper';
import { RoutePath } from '../../routes';

import { flowQuery } from '../../services/flow';

export interface FlowListProps {}

export const FlowList: FunctionComponent<FlowListProps> = () => {
  const allFlows = useObservableState(flowQuery.allFlows$);

  const columns: ColumnsType<FlowSchema> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={RoutePath.FlowDetail.replace(':flowId', record.name)}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <Paper>
      <Table columns={columns} dataSource={allFlows} />
    </Paper>
  );
};
