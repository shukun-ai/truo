import { Container, ScrollArea } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { WidgetDetail } from '../widget-detail/widget-detail';

export type TabWidgetProps = {
  tab: TabEntity;
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
    return null;
  }

  return (
    <ScrollArea sx={{ width: '100%', height: '100%' }}>
      <Container fluid>
        <WidgetDetail tab={tab} widget={widgetEntity} definition={definition} />
      </Container>
    </ScrollArea>
  );
};
