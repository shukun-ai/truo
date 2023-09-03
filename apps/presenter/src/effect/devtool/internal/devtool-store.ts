import { BehaviorSubject } from 'rxjs';

const devtoolStore = new BehaviorSubject<{
  lastDescription: string;
  state: Record<string, any>;
  widgetState: Record<string, { index: number; item: unknown }>;
  widgetProperties: Record<string, any>;
}>({
  lastDescription: 'initial',
  state: {},
  widgetState: {},
  widgetProperties: {},
});

export const logState = (description: string, state: any) => {
  const previous = devtoolStore.getValue();
  devtoolStore.next({
    ...previous,
    state,
    lastDescription: `[state] ${description}`,
  });
};

export const logWidget = (
  description: string,
  widgetId: string,
  state: { index: number; item: unknown },
  properties: Record<string, unknown>,
) => {
  const previous = devtoolStore.getValue();
  devtoolStore.next({
    ...previous,
    widgetState: {
      ...previous.widgetState,
      [widgetId]: JSON.parse(JSON.stringify(state)),
    },
    widgetProperties: {
      ...previous.widgetProperties,
      [widgetId]: JSON.parse(JSON.stringify(properties)),
    },
    lastDescription: `[widget] ${description}`,
  });
};

export const query = () => {
  return devtoolStore.asObservable();
};
