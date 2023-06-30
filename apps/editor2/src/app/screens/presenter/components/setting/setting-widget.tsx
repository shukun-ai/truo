import { Box, Container, ScrollArea } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useMemo } from 'react';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { WidgetForm } from '../widget/widget-form';

export type SettingWidgetProps = {
  tab: PresenterTabEntity;
};

export const SettingWidget = ({ tab }: SettingWidgetProps) => {
  const app = useAppContext();

  const allWidgets = useObservableState(
    app.repositories.presenterRepository.widgetRepository.allWidgets$,
    [],
  );
  const widgetDefinitions = useObservableState(
    app.repositories.presenterRepository.widgetDefinitions$,
    {},
  );

  const widget = useMemo(() => {
    if (tab.tabType !== 'widget') {
      return null;
    }
    const { widgetName } = tab;
    if (!widgetName) {
      return null;
    }
    return allWidgets.find((widget) => widget.id === tab.widgetName);
  }, [allWidgets, tab]);

  const definition = useMemo(() => {
    const { tag } = widget ?? {};
    if (!tag) {
      return null;
    }
    const definition = widgetDefinitions[tag];
    if (!definition) {
      return null;
    }
    return definition;
  }, [widget, widgetDefinitions]);

  if (!widget || !definition) {
    return <Box>未找到相关组件</Box>;
  }

  return (
    <ScrollArea sx={{ width: '100%', height: '100%' }}>
      <Container fluid>
        <WidgetForm tab={tab} widget={widget} definition={definition} />
      </Container>
    </ScrollArea>
  );
};
