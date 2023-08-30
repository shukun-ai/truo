import {
  Box,
  Divider,
  Group,
  ScrollArea,
  Text,
  createStyles,
} from '@mantine/core';
import { IconDatabaseCog } from '@tabler/icons-react';

import { useEditorContext } from '../../editor-context';

import { extractTabForeignId } from '../../helpers/extract-tab-foreign-id';

import { CreateButton } from './internal/create-button';
import { MoreButton } from './internal/more-button';
import { MoreTag } from './internal/more-tag';

export const MetadataListPane = () => {
  const { classes, cx } = useStyles();

  const { state, dispatch } = useEditorContext();

  const { selectedTab, metadatas } = state;

  return (
    <Box className={cx(classes.wrapper)}>
      <Box>
        <CreateButton />
        <Divider />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {Object.values(metadatas).map((metadataEntity) => (
          <Box
            key={metadataEntity.id}
            className={cx(
              classes.button,
              extractTabForeignId(selectedTab, 'metadata') ===
                metadataEntity.id && classes.active,
            )}
            onClick={() => {
              dispatch.tab.previewMetadata(metadataEntity.id);
            }}
          >
            <Group>
              <IconDatabaseCog size="1rem" />
              <Text size="sm">{metadataEntity.id}</Text>
              <MoreTag metadataEntity={metadataEntity} />
            </Group>
            <MoreButton metadataEntity={metadataEntity} />
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
