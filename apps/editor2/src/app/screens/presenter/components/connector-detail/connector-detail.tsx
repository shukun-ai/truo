import { Box, Button, Group, Text, useMantineTheme } from '@mantine/core';

import { useForm } from '@mantine/form';

import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { ConnectorEntity } from '../../../../../repositories/connector/connector-ref';
import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { Schema } from './internal/schema';

export type ConnectorDetailProps = {
  tab: TabEntity;
  connectorEntity: ConnectorEntity;
};

export const ConnectorDetail = ({
  tab,
  connectorEntity,
}: ConnectorDetailProps) => {
  const theme = useMantineTheme();

  const app = useAppContext();

  const form = useForm<ConnectorEntity>({
    initialValues: structuredClone(connectorEntity),
  });

  const [fixedCache, setFixedCache] = useState(false);

  useEffect(() => {
    if (!isEqual(form.values, connectorEntity) && !fixedCache) {
      app.repositories.tabRepository.fixTab(tab.id);
      app.repositories.tabRepository.activeEditTab(tab.id);
      setFixedCache(true);
    }
  }, [
    app.repositories.tabRepository,
    connectorEntity,
    fixedCache,
    form.values,
    tab.id,
  ]);

  const handleSubmit = useCallback(() => {
    app.repositories.connectorRepository.update(form.values);
    app.repositories.tabRepository.inactiveEditTab(tab.id);
    setFixedCache(false);
  }, [
    app.repositories.connectorRepository,
    app.repositories.tabRepository,
    form.values,
    tab.id,
  ]);

  return (
    <Box>
      <form>
        {tab.isEdit ? (
          <Box
            sx={{
              background: theme.colors.blue[2],
              marginLeft: -16,
              marginRight: -16,
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
              <Text>函数流正处于编辑状态，编辑后进行保存。</Text>
              <Button size="xs" variant="light" onClick={handleSubmit}>
                点击保存
              </Button>
            </Group>
          </Box>
        ) : (
          <Box sx={{ height: 16 }}></Box>
        )}
        <Schema form={form} />
      </form>
    </Box>
  );
};
