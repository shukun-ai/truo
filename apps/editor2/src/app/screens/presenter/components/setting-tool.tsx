import { Box } from '@mantine/core';
import { useObservableState } from 'observable-hooks';

import { useAppContext } from '../../../contexts/app-context';

import { WidgetPane } from './widget/widget-pane';

export type SettingToolProps = {
  //
};

export const SettingTool = () => {
  const app = useAppContext();

  const selectedWidgetId = useObservableState(
    app.repositories.presenterRepository.selectedWidgetId$,
    null,
  );

  return <Box>{selectedWidgetId && <WidgetPane />}</Box>;
};
