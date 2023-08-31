import { Box } from '@mantine/core';
import { IconBraces } from '@tabler/icons-react';
import { useMemo } from 'react';

import { ACTIVE_COLOR, DISABLED_COLOR } from './color-scheme';

export type WidgetIconProps = {
  active: boolean;
  disabled: boolean;
  icon?: (props: { size: string }) => JSX.Element;
};

export const WidgetIcon = ({ active, disabled, icon }: WidgetIconProps) => {
  const color = useMemo(() => {
    if (disabled) {
      return DISABLED_COLOR;
    } else if (active) {
      return ACTIVE_COLOR;
    } else {
      return undefined;
    }
  }, [active, disabled]);

  return (
    <Box c={color}>
      {icon ? icon({ size: '5rem' }) : createDefaultIcon({ size: '5rem' })}
    </Box>
  );
};

const createDefaultIcon = ({ size }: { size: string }) => {
  return <IconBraces size={size} />;
};
