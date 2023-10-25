import { Box, Divider, Group, ScrollArea, Text, Title } from '@mantine/core';
import { Icon } from '@shukun/component';

import { useEditorContext } from '../../editor-context';

import { extractTabForeignId } from '../../helpers/extract-tab-foreign-id';

import { useListStyles } from '../common/list-style';

export const ProcessList = () => {
  const { classes, cx } = useListStyles();

  const { state, dispatch } = useEditorContext();

  const { selectedTab, processes } = state;

  return (
    <Box className={cx(classes.wrapper)}>
      <Box mb={8}>
        <Title order={4} p={12}>
          查看事件流程
        </Title>
        <Divider />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {Object.values(processes).map((processEntity) => (
          <Box
            key={processEntity.id}
            className={cx(
              classes.button,
              extractTabForeignId(selectedTab, 'process') ===
                processEntity.id && classes.active,
            )}
            onClick={() => {
              dispatch.tab.previewProcess(processEntity.id);
            }}
          >
            <Group>
              <Icon type="activityBarProcesses" size="1rem" />
              <Text size="sm">$.{processEntity.label}</Text>
            </Group>
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
};
