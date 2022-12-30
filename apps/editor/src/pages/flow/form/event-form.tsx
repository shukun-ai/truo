import { FlowEvent } from '@shukun/schema';
import React, { FunctionComponent, useMemo } from 'react';

import { PADDING } from '../flow-constant';
import { eventSchemas } from '../flow-event-schemas';
import { EventNodeForm } from '../nodes/event-node-form';
import { EventNodeFormItem } from '../nodes/event-node-form-item';

export interface EventFormProps {
  eventName: string;
  event: FlowEvent;
}

export const EventForm: FunctionComponent<EventFormProps> = ({
  eventName,
  event,
}) => {
  const eventSchema = useMemo(() => eventSchemas[event.type], [event.type]);

  return (
    <EventNodeForm initialValues={event} eventName={eventName}>
      <div style={{ padding: PADDING }}>
        <EventNodeFormItem eventSchema={eventSchema} />
      </div>
    </EventNodeForm>
  );
};
