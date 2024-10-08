import {
  Badge,
  Box,
  Divider,
  Group,
  ScrollArea,
  Text,
  createStyles,
} from '@mantine/core';

import { useEditorContext } from '../../editor-context';

import { extractTabForeignId } from '../../helpers/extract-tab-foreign-id';

import { CreateButton } from './internal/create-button';
import { MoreButton } from './internal/more-button';

export const EnvironmentListPane = () => {
  const { classes, cx } = useStyles();

  const { state, dispatch } = useEditorContext();

  const { selectedTab, environments } = state;

  return (
    <Box className={cx(classes.wrapper)}>
      <Box>
        <CreateButton />
        <Divider />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {Object.values(environments).map((environmentEntity) => (
          <Box
            key={environmentEntity.id}
            className={cx(
              classes.button,
              extractTabForeignId(selectedTab, 'environment') ===
                environmentEntity.id && classes.active,
            )}
            onClick={() => {
              dispatch.tab.previewEnvironment(environmentEntity.id);
            }}
          >
            <Group>
              <Text size="sm" truncate w={100}>
                {environmentEntity.id}
              </Text>
              {environmentEntity.isPublic ? (
                <Badge color="orange">公开</Badge>
              ) : (
                <Badge color="gray">私密</Badge>
              )}
            </Group>
            <MoreButton environmentEntity={environmentEntity} />
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
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
    borderRadius: theme.defaultRadius,
    cursor: 'pointer',
    '&:hover': {
      background: theme.colors.blue[1],
    },
  },
  active: {
    background: theme.colors.blue[8],
    color: theme.white,
    '&:hover': {
      background: theme.colors.blue[8],
    },
  },
}));
