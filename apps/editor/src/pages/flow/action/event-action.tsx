import { Select } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

import { flowCommand, flowQuery } from '../../../services/flow';

export interface EventActionProps {}

export const EventAction: FunctionComponent<EventActionProps> = () => {
  const flow = useObservableState(flowQuery.activeFlow$);

  const options = useMemo(() => {
    if (!flow) {
      return [];
    }
    return Object.entries(flow.events).map(([eventName, event]) => ({
      label: eventName,
      value: eventName,
    }));
  }, [flow]);

  const onChange = useCallback((startEventName) => {
    const flow = flowQuery.getCloneActiveFlow();
    flowCommand.updateStartEventName(flow, startEventName);
  }, []);

  return (
    <div>
      <Select value={flow?.startEventName} onChange={onChange} showSearch>
        {options?.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
