import { useMemo } from 'react';

export type DevtoolLogs = {
  state: Record<string, unknown>;
  widgetState: Record<string, { index: number; item: unknown }>;
  widgetProperties: Record<string, unknown>;
};

export const useCompletionState = (
  devtoolLogs?: DevtoolLogs,
  widgetId?: string,
): { state: Record<string, unknown> } => {
  const state = useMemo(() => {
    if (!devtoolLogs) {
      return {};
    }

    const state: Record<string, unknown> = {
      ...devtoolLogs.state,
    };

    if (widgetId) {
      const widgetState = devtoolLogs.widgetState[widgetId];
      return {
        ...state,
        ...widgetState,
      };
    } else {
      return state;
    }
  }, [devtoolLogs, widgetId]);

  return {
    state,
  };
};
