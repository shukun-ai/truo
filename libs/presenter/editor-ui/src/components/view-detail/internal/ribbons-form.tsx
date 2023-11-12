import { ActionIcon, Group } from '@mantine/core';
import { ArrayInputs, Icon } from '@shukun/component';
import { ViewLinkType, ViewRibbon } from '@shukun/schema';
import {
  append,
  getUniqueLabel,
  move,
  remove,
  update,
} from '@shukun/util-functions';

import { RibbonForm } from './ribbon-form';

export type RibbonsFormProps = {
  value: ViewRibbon[];
  onChange: (newValue: ViewRibbon[]) => void;
};

export const RibbonsForm = ({ value, onChange }: RibbonsFormProps) => {
  return (
    <ArrayInputs
      value={value}
      onUpdate={(index, newValue) => {
        onChange(update(value, index, newValue));
      }}
      onCreate={() => {
        const key = getUniqueLabel(
          'untitle',
          value.map((item) => item.name),
        );
        onChange(
          append(value, {
            name: key,
            label: '',
            type: ViewLinkType.None,
          }),
        );
      }}
      onMove={(sourceIndex, targetIndex) => {
        onChange(move(value, sourceIndex, targetIndex));
      }}
      onRemove={(index) => {
        onChange(remove(value, index));
      }}
      renderItem={(itemValue, itemChange, itemRemove, { drag }) => (
        <Group>
          <RibbonForm
            value={itemValue}
            onChange={(newValue) => {
              itemChange(newValue);
            }}
          />
          <ActionIcon
            mt={22}
            onClick={() => {
              itemRemove();
            }}
          >
            <Icon type="trash" size="1rem" />
          </ActionIcon>
        </Group>
      )}
    />
  );
};
