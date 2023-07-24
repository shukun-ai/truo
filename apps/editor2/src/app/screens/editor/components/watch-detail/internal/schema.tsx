import { Box } from '@mantine/core';

import { PresenterWatch } from '@shukun/schema';

import { PresenterWatchEntity } from '../../../../../../repositories/presenter/watch-ref';

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
