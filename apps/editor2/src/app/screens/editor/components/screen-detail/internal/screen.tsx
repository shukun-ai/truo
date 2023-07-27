import {
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Title,
  Tooltip,
} from '@mantine/core';

import { useObservableState } from 'observable-hooks';

import { useParams } from 'react-router-dom';

import { PresenterContainerEntity } from '../../../../../../repositories/presenter/container-ref';
import { SCREEN_HOME_PAGE_ID } from '../../../../../../repositories/presenter/presenter-store';
import { PresenterScreenEntity } from '../../../../../../repositories/presenter/screen-ref';
import { useAppContext } from '../../../../../contexts/app-context';

import { SlotStructure, availableSlots } from './available-slots';
import { MoreButton } from './more-button';

export type ScreenProps = {
  screen: PresenterScreenEntity;
};

export const Screen = ({ screen }: ScreenProps) => {
  const app = useAppContext();
  const currentUser = useObservableState(
    app.repositories.authRepository.currentUser$,
    null,
  );
  const containerRecords = useObservableState(
    app.repositories.presenterRepository.containerRepository.records$,
    {},
  );
  const { presenterName } = useParams();

  const { layout } = screen;
  return (
    <Card withBorder sx={{ overflow: 'visible' }} pt={0}>
      <Group position="right" mr={-12}>
        <MoreButton screen={screen} />
      </Group>
      <Group position="center" align="baseline">
        <Tooltip
          label={`/presenter/${currentUser?.orgName}/${presenterName}/${screen.screenName}`}
        >
          <Title order={5} mb={12} align="center">
            {screen.screenName}
          </Title>
        </Tooltip>
        {screen.id === SCREEN_HOME_PAGE_ID && <Badge c="gray">首页</Badge>}
      </Group>
      <Group position="center" mb={12}>
        <Tooltip label="排版方案">
          <Badge sx={{ textTransform: 'none' }}>{screen.layout}</Badge>
        </Tooltip>
      </Group>
      <Card.Section>
        <Stack spacing={0}>
          {availableSlots?.[layout]?.map((slot) => (
            <Button
              variant="light"
              key={slot.name}
              disabled={!screen.slots[slot.name]}
              size="xs"
              mb={0}
              onClick={() => {
                app.repositories.presenterRepository.chooseContainer(
                  screen.screenName,
                  screen.slots[slot.name],
                );
              }}
            >
              {!screen.slots[slot.name]
                ? `${slot.name}: 无`
                : `${slot.name}: ${getLabel(screen, containerRecords, slot)}`}
            </Button>
          ))}
        </Stack>
      </Card.Section>
    </Card>
  );
};

const getLabel = (
  screen: PresenterScreenEntity,
  containerRecords: Record<string, PresenterContainerEntity>,
  slot: SlotStructure,
) => {
  const containerId = screen.slots[slot.name];
  if (!containerId) {
    return '未找到 containerId';
  }
  const container = containerRecords[containerId];
  if (!container) {
    return '已删除';
  }
  return container.label;
};
