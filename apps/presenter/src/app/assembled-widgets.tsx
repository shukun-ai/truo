import { PresenterNode, PresenterWidget } from '@shukun/schema';

import { AppProps } from '../interfaces/app';

import { WrappedWidget } from './wrapped-widget';

export type AssembledWidgetsProps = {
  nodes: PresenterNode;
  appProps: AppProps;
};

export const AssembledWidgets = ({
  nodes,
  appProps,
}: AssembledWidgetsProps) => {
  return nodes.map((node) => {
    return <AssembledWidget key={node} widgetId={node} appProps={appProps} />;
  });
};

type AssembledWidgetProps = {
  widgetId: string;
  appProps: AppProps;
};

const AssembledWidget = ({ widgetId, appProps }: AssembledWidgetProps) => {
  const { presenter } = appProps;

  const widget: PresenterWidget | undefined = presenter.widgets[widgetId];
  const nodes: PresenterNode | undefined = presenter.nodes[widgetId];
  const nextElements = nodes ? (
    <AssembledWidgets nodes={nodes} appProps={appProps} />
  ) : null;

  if (!widget) {
    throw new Error('Did not find widget');
  }

  return (
    <WrappedWidget widgetId={widgetId} widget={widget} appProps={appProps}>
      {nextElements}
    </WrappedWidget>
  );
};
