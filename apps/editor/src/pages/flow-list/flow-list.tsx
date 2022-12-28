import { FlowSchema } from '@shukun/schema';
import { Button, message, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Paper } from '../../components/paper';
import { RoutePath } from '../../routes';

import { flowCommand, flowQuery } from '../../services/flow';

export interface FlowListProps {}

export const FlowList: FunctionComponent<FlowListProps> = () => {
  const history = useHistory();

  const allFlows = useObservableState(flowQuery.allFlows$);

  const columns: ColumnsType<FlowSchema> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={RoutePath.FlowDetail.replace(':flowName', record.name)}>
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

  const handleClick = useCallback(() => {
    const flowName = window.prompt('What name is the new flow?');

    if (flowName) {
      flowCommand.createFlow(flowName);
      history.push(RoutePath.FlowDetail.replace(':flowName', flowName));
    } else {
      message.error('You did not input the name of flow.');
    }
  }, [history]);

  return (
    <Paper>
      <Button type="primary" onClick={handleClick}>
        Create a new flow
      </Button>
      <Table columns={columns} dataSource={allFlows} />
    </Paper>
  );
};
