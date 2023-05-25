import { Box } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useAppContext } from '../../../../contexts/app-context';

import { WidgetField } from './widget-field';

export type WidgetPaneProps = {
  //
};

export const WidgetPane = () => {
  const app = useAppContext();

  const selectedDefinition = useObservableState(
    app.repositories.presenterRepository.selectedDefinition$,
    null,
  );

  if (!selectedDefinition) {
    return <Box>未选择组件</Box>;
  }

  return (
    <Box>
      <form>
        {Object.entries(selectedDefinition.properties).map(
          ([propertyId, property]) => (
            <WidgetField propertyId={propertyId} property={property} />
          ),
        )}
      </form>
    </Box>
  );
};
