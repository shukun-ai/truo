import { Box, Container, ScrollArea } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { WidgetForm } from '../widget/widget-form';

export type TabWidgetProps = {
  tab: PresenterTabEntity;
};

export const TabWidget = ({ tab }: TabWidgetProps) => {
  const app = useAppContext();

  const allWidgetEntities = useObservableState(
    app.repositories.presenterRepository.widgetRepository.allWidgets$,
    [],
  );
  const widgetDefinitions = useObservableState(
    app.repositories.presenterRepository.widgetDefinitions$,
    {},
  );

  const widgetEntity = useMemo(() => {
    if (tab.tabType !== 'widget') {
      return null;
    }
    const { widgetEntityId } = tab;
    if (!widgetEntityId) {
      return null;
    }
    return allWidgetEntities.find(
      (widgetEntity) => widgetEntity.id === tab.widgetEntityId,
    );
  }, [allWidgetEntities, tab]);

  const definition = useMemo(() => {
    const { tag } = widgetEntity ?? {};
    if (!tag) {
      return null;
    }
    const definition = widgetDefinitions[tag];
    if (!definition) {
      return null;
    }
    return definition;
  }, [widgetEntity, widgetDefinitions]);

  if (!widgetEntity || !definition) {
    return <Box>未找到相关组件</Box>;
  }

  return (
    <ScrollArea sx={{ width: '100%', height: '100%' }}>
      <Container fluid>
        <WidgetForm tab={tab} widget={widgetEntity} definition={definition} />
      </Container>
    </ScrollArea>
  );
};
