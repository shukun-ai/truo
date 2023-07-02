import { Box, Button, Group, Text, useMantineTheme } from '@mantine/core';

import { useForm } from '@mantine/form';

import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { PresenterTabEntity } from '../../../../../repositories/presenter/tab-ref';
import { PresenterWatchEntity } from '../../../../../repositories/presenter/watch-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { WatchFormProvider } from './watch-context';
import { WatchField } from './watch-field';

export type WatchFormProps = {
  tab: PresenterTabEntity;
  watchEntity: PresenterWatchEntity;
};

export const WatchForm = ({ tab, watchEntity }: WatchFormProps) => {
  const theme = useMantineTheme();

  const app = useAppContext();

  const form = useForm<PresenterWatchEntity>({
    initialValues: structuredClone(watchEntity),
  });

  const [fixedCache, setFixedCache] = useState(false);

  useEffect(() => {
    if (!isEqual(form.values, watchEntity) && !fixedCache) {
      app.repositories.presenterRepository.tabRepository.fixTab(tab.id);
      app.repositories.presenterRepository.tabRepository.activeEditTab(tab.id);
      setFixedCache(true);
    }
  }, [
    app.repositories.presenterRepository.tabRepository,
    fixedCache,
    form.values,
    tab.id,
    watchEntity,
  ]);

  const handleSubmit = useCallback(() => {
    app.repositories.presenterRepository.watchRepository.update(
      watchEntity.id,
      {
        ...watchEntity,
        ...form.values,
      },
    );
    app.repositories.presenterRepository.tabRepository.inactiveEditTab(tab.id);
    setFixedCache(false);
  }, [
    app.repositories.presenterRepository.tabRepository,
    app.repositories.presenterRepository.watchRepository,
    form.values,
    tab.id,
    watchEntity,
  ]);

  return (
    <Box>
      <WatchFormProvider form={form}>
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
                <Text>组件正处于编辑状态，编辑后进行保存。</Text>
                <Button size="xs" variant="light" onClick={handleSubmit}>
                  点击保存
                </Button>
              </Group>
            </Box>
          ) : (
            <Box sx={{ height: 16 }}></Box>
          )}
          <WatchField watchEntity={watchEntity} />
        </form>
      </WatchFormProvider>
    </Box>
  );
};
