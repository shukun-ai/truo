import { LegacyFunctionComponent } from '@shukun/component';
import { FlowEvent } from '@shukun/schema';
import React, { FunctionComponent } from 'react';

export interface EventNodeActionProps {
  eventName: string;
  event: FlowEvent;
}

export const EventNodeAction: LegacyFunctionComponent<
  EventNodeActionProps
> = () => {
  return <div></div>;
};
