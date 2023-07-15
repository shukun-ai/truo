import { Box, Button, Group, Text, useMantineTheme } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';

import { TabEntity } from '../../../repositories/tab/tab-ref';
import { useAppContext } from '../../contexts/app-context';

export type TabAlertProps = {
  tab: TabEntity;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: any;
};

export const TabAlert = ({ tab, formValue, entity }: TabAlertProps) => {
  const theme = useMantineTheme();

  const app = useAppContext();

  const [fixedCache, setFixedCache] = useState(false);

  useEffect(() => {
    if (JSON.stringify(formValue) !== JSON.stringify(entity) && !fixedCache) {
      app.repositories.tabRepository.fixTab(tab.id);
      app.repositories.tabRepository.activeEditTab(tab.id);
      setFixedCache(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity, fixedCache, formValue, tab.id]);

  const handleSubmit = useCallback(() => {
    app.repositories.connectorRepository.update(formValue);
    app.repositories.tabRepository.inactiveEditTab(tab.id);
    setFixedCache(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue, tab.id]);

  if (!tab.isEdit) {
    return <Box sx={{ height: 16 }}></Box>;
  }

  return (
    <Box
      sx={{
        background: theme.colors.blue[2],
        padding: 6,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 16,
        position: 'sticky',
        top: 0,
        zIndex: 1,
      }}
    >
      <Group spacing="xs">
        <Text>正处于编辑状态，编辑后进行保存。</Text>
        <Button size="xs" variant="light" onClick={handleSubmit}>
          点击保存
        </Button>
      </Group>
    </Box>
  );
};
