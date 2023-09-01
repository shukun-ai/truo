import { createStyles } from '@mantine/core';

export const useListStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',
  },
  button: {
    display: 'flex',
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 0,
    cursor: 'pointer',
    '&:hover': {
      background: theme.colors.gray[1],
    },
  },
  active: {
    background: theme.fn.rgba(theme.colors.blue[2], 0.5),

    '&:hover': {
      background: theme.fn.rgba(theme.colors.blue[2], 0.5),
    },
  },
}));
