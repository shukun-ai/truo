import { Box } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';
import { EventInput } from '../event/event-input';

import { composeFormEventName, useWidgetFormContext } from './widget-context';

export type WidgetEventInputProps = {
  tab: PresenterTabEntity;
  propertyId: string;
  property: WidgetProperty;
};

export const WidgetEventInput = ({
  tab,
  propertyId,
  property,
}: WidgetEventInputProps) => {
  const form = useWidgetFormContext();
  const formProps = form.getInputProps(composeFormEventName(propertyId));

  return (
    <Box sx={{ marginBottom: 16 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
        <Box sx={{ marginRight: 6 }}>
          {property.label} ({propertyId})
        </Box>
      </Box>
      <EventInput containerName={tab.containerName} {...formProps} />
    </Box>
  );
};
