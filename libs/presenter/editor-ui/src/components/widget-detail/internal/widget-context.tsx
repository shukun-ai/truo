import { createContext, useContext } from 'react';

export type WidgetContextProps = {
  widgetId?: string;
};

export const WidgetContext = createContext<WidgetContextProps | null>(null);

export const useWidgetContext = (): WidgetContextProps => {
  const widgetContext = useContext(WidgetContext);

  if (!widgetContext) {
    throw new Error('The widgetContext is not initialize.');
  }
  return widgetContext;
};
