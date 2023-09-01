import { PresenterNode, PresenterWidget } from '@shukun/schema';

import { AppProps } from '../interfaces/app';

import { WrappedWidget } from './wrapped-widget';

export const assembleWidgets = ({
  nodes,
  appProps,
}: {
  nodes: PresenterNode;
  appProps: AppProps;
}): JSX.Element[] => {
  const children = nodes.map((node) => assembleWidget({ node, appProps }));
  return children;
};

export const assembleWidget = ({
  node,
  appProps,
}: {
  node: string;
  appProps: AppProps;
}): JSX.Element => {
  const { presenter } = appProps;
  const widget: PresenterWidget | undefined = presenter.widgets[node];
  const nodes: PresenterNode | undefined = presenter.nodes[node];
  const nextElements = nodes ? assembleWidgets({ nodes, appProps }) : null;

  if (!widget) {
    throw new Error('Did not find widget');
  }

  return (
    <WrappedWidget
      key={node}
      widgetId={node}
      widget={widget}
      appProps={appProps}
    >
      {nextElements}
    </WrappedWidget>
  );
};
