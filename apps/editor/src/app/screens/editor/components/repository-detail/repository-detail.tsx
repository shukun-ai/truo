import { Box, Button, Group, Text, useMantineTheme } from '@mantine/core';

import { useForm } from '@mantine/form';
import { RepositorySchema } from '@shukun/schema';

import { isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { PresenterRepositoryEntity } from '../../../../../repositories/presenter/repository-ref';
import { TabEntity } from '../../../../../repositories/tab/tab-ref';
import { useAppContext } from '../../../../contexts/app-context';

import { RepositoryFormProvider } from './internal/context';
import { RepositoryField } from './internal/field';

export type RepositoryDetailProps = {
  tab: TabEntity;
  repository: PresenterRepositoryEntity;
  definition: RepositorySchema;
};

export const RepositoryDetail = ({
  tab,
  repository,
  definition,
}: RepositoryDetailProps) => {
  const theme = useMantineTheme();

  const app = useAppContext();

  const form = useForm<PresenterRepositoryEntity['parameters']>({
    initialValues: structuredClone(repository.parameters),
  });

  const [fixedCache, setFixedCache] = useState(false);

  useEffect(() => {
    if (!isEqual(form.values, repository.parameters) && !fixedCache) {
      app.repositories.tabRepository.fixTab(tab.id);
      app.repositories.tabRepository.activeEditTab(tab.id);
      setFixedCache(true);
    }
  }, [
    app.repositories.tabRepository,
    fixedCache,
    form.values,
    repository.parameters,
    tab.id,
  ]);

  const handleSubmit = useCallback(() => {
    app.repositories.presenterRepository.repositoryRepository.update(
      repository.id,
      {
        ...repository,
        parameters: form.values,
      },
    );
    app.repositories.tabRepository.inactiveEditTab(tab.id);
    setFixedCache(false);
  }, [
    app.repositories.presenterRepository.repositoryRepository,
    app.repositories.tabRepository,
    form.values,
    repository,
    tab.id,
  ]);

  return (
    <Box>
      <RepositoryFormProvider form={form}>
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
          {Object.entries(definition.parameters).map(
            ([parameterName, parameter]) => (
              <RepositoryField
                key={parameterName}
                parameterName={parameterName}
                parameter={parameter}
              />
            ),
          )}
        </form>
      </RepositoryFormProvider>
    </Box>
  );
};
