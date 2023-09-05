export type LifecycleWidgetProps = {
  interval?: number;
  stateChanged?: string[][];
  mounted?: boolean;
  onRun?: (payload: undefined) => Promise<void>;
};
