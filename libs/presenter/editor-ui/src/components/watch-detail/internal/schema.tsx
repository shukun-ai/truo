import { Alert, Box } from '@mantine/core';

import { PresenterWatch } from '@shukun/schema';

import { IconInfoCircle } from '@tabler/icons-react';

import { ContainerMountedTrigger } from './container-mounted-trigger';
import { EventInput } from './event-input';
import { IntervalTrigger } from './interval-trigger';
import { StateChangedTrigger } from './state-changed-trigger';

export type SchemaProps = {
  watchEntity: PresenterWatchEntity;
  value: PresenterWatch;
  onChange: (newValue: PresenterWatch) => void;
};

export const Schema = ({ watchEntity, value, onChange }: SchemaProps) => {
  return (
    <Box>
      <Alert icon={<IconInfoCircle />} mb={12}>
        观察器监听变化从而触发执行事件的功能，大部分功能将通过观察器实现。请先选择触发条件，然后设置相应的执行事件
      </Alert>

      <Box>
        <Box mb={12}>
          <StateChangedTrigger
            value={value.triggers.stateChanged}
            onChange={(newValue) => {
              onChange({
                ...value,
                triggers: {
                  ...value.triggers,
                  stateChanged: newValue,
                },
              });
            }}
          />
        </Box>
        <Box mb={12}>
          <ContainerMountedTrigger
            value={value.triggers.containerMounted}
            onChange={(newValue) => {
              onChange({
                ...value,
                triggers: {
                  ...value.triggers,
                  containerMounted: newValue,
                },
              });
            }}
          />
        </Box>
        <Box mb={12}>
          <IntervalTrigger
            value={value.triggers.interval}
            onChange={(newValue) => {
              onChange({
                ...value,
                triggers: {
                  ...value.triggers,
                  interval: newValue,
                },
              });
            }}
          />
        </Box>
      </Box>

      <EventInput
        watchEntity={watchEntity}
        value={value.events}
        onChange={(newValue) => {
          onChange({
            ...value,
            events: newValue,
          });
        }}
      />
    </Box>
  );
};
