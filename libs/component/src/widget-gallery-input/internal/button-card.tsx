import {
  Box,
  Popover,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMemo } from 'react';

import {
  ACTIVE_BG,
  ACTIVE_COLOR,
  DISABLED_BG,
  DISABLED_COLOR,
} from './color-scheme';

export type ButtonCardProps = {
  active: boolean;
  disabled: boolean;
  widgetDescription?: string;
  onClick: () => void;
  children: JSX.Element;
};

export const ButtonCard = ({
  active,
  disabled,
  widgetDescription,
  onClick,
  children,
}: ButtonCardProps) => {
  const bg = useMemo(() => {
    if (disabled) {
      return DISABLED_BG;
    } else if (active) {
      return ACTIVE_BG;
    } else {
      return undefined;
    }
  }, [active, disabled]);

  const color = useMemo(() => {
    if (disabled) {
      return DISABLED_COLOR;
    } else if (active) {
      return ACTIVE_COLOR;
    } else {
      return undefined;
    }
  }, [active, disabled]);

  const theme = useMantineTheme();

  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover
      width={200}
      withArrow
      withinPortal
      shadow="md"
      opened={opened}
      disabled={widgetDescription && disabled ? false : true}
    >
      <Popover.Target>
        <Box onMouseEnter={open} onMouseLeave={close}>
          <UnstyledButton
            bg={bg}
            c={color}
            onClick={onClick}
            disabled={disabled}
            sx={{
              width: '100%',
              borderRadius: theme.radius.md,
              padding: 12,
              border:
                active || disabled ? 'solid 1px transparent' : 'solid 1px #eee',
            }}
          >
            {children}
          </UnstyledButton>
        </Box>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        <Text size="sm">{widgetDescription}</Text>
      </Popover.Dropdown>
    </Popover>
  );
};
