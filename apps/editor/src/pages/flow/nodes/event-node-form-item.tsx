import React, { FunctionComponent } from 'react';

import { InputFactory } from '../flow-input-factory';
import { EventSchema } from '../interface/event-schema';

export interface EventNodeFormItemProps {
  eventSchema: EventSchema;
}

export const EventNodeFormItem: FunctionComponent<EventNodeFormItemProps> = ({
  eventSchema,
}) => {
  return (
    <>
      {Object.entries(eventSchema.properties).map(([name, field]) => {
        return <InputFactory name={name} field={field} />;
      })}
    </>
  );
};
