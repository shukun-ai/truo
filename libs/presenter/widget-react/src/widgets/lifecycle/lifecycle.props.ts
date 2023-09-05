export type LifecycleWidgetProps = {
  interval?: number;
  stateChanged?: undefined;
  mounted?: boolean;
  onRun?: (payload: undefined) => Promise<void>;
};
