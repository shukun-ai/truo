import { Box, ColorInput, Group, Select, TextInput } from '@mantine/core';
import { ViewLinkType, ViewRibbon } from '@shukun/schema';

import { viewLinkTypeOptions } from './view-link-type-options';

export type RibbonFormProps = {
  value: ViewRibbon;
  onChange: (newValue: ViewRibbon) => void;
};

export const RibbonForm = ({ value, onChange }: RibbonFormProps) => {
  return (
    <Box>
      <Group>
        <TextInput
          label="按钮标识符"
          value={value.name}
          onChange={(event) => {
            onChange({
              ...value,
              name: event.target.value,
            });
          }}
        />
        <TextInput
          label="按钮显示名"
          value={value.label}
          onChange={(event) => {
            onChange({
              ...value,
              label: event.target.value,
            });
          }}
        />
        <Select
          label="按钮类型"
          data={viewLinkTypeOptions}
          value={value.type}
          onChange={(newValue) => {
            onChange({
              ...value,
              type: newValue as ViewLinkType,
            });
          }}
        />
        <TextInput
          label="按钮值"
          value={value.value}
          onChange={(event) => {
            onChange({
              ...value,
              value: event.target.value,
            });
          }}
        />
        <TextInput
          label="String Query"
          value={value.query}
          onChange={(event) => {
            onChange({
              ...value,
              query: event.target.value,
            });
          }}
        />
      </Group>
      <Group>
        <TextInput
          label="是否禁用(编程)"
          value={value.disabledCode}
          onChange={(event) => {
            onChange({
              ...value,
              disabledCode: event.target.value,
            });
          }}
        />
        <TextInput
          label="禁用时提示信息"
          value={value.disabledTip}
          onChange={(event) => {
            onChange({
              ...value,
              disabledTip: event.target.value,
            });
          }}
        />
        <TextInput
          label="二次确认提示信息"
          // description="如果添加二次确认提示信息，则会弹出提示信息。若未添加则直接通过。"
          value={value.confirmedTip}
          onChange={(event) => {
            onChange({
              ...value,
              confirmedTip: event.target.value,
            });
          }}
        />
        <ColorInput
          label="按钮颜色"
          value={value.color}
          onChange={(newValue) =>
            onChange({
              ...value,
              color: newValue,
            })
          }
        />
      </Group>
    </Box>
  );
};
