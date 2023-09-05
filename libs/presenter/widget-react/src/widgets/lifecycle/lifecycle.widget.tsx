import { Box } from '@mantine/core';

import { useInterval } from '@mantine/hooks';
import { useEffect, useState } from 'react';

import { createWidget } from '../../abstracts/create-widget';

import { LifecycleWidgetProps } from './lifecycle.props';

export const LifecycleWidget = createWidget<LifecycleWidgetProps>(
  ({ ...props }) => {
    useSetInterval(props);
    useMount(props);

    return <Box display="none">lifecycle widget</Box>;
  },
);

const useMount = ({
  mounted,
  onRun,
}: Pick<LifecycleWidgetProps, 'mounted' | 'onRun'>) => {
  const [once, setOnce] = useState(false);

  useEffect(() => {
    if (!once && mounted) {
      setOnce(true);
      onRun && onRun(undefined);
    }
  }, [mounted, onRun, once]);
};

const useSetInterval = ({
  interval,
  onRun,
}: Pick<LifecycleWidgetProps, 'interval' | 'onRun'>) => {
  const { start, stop } = useInterval(() => {
    onRun && onRun(undefined);
  }, interval ?? 0);

  useEffect(() => {
    if (interval !== undefined && interval > 0) {
      start();
    }
    return stop;
  });
};
