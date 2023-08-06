import { Card } from '@mantine/core';

import { EditorBoxModelSchema } from '@shukun/presenter-input-schema';

import { SimpleWrapper } from '../simple-wrapper/simple-wrapper';
import { StringInput } from '../string/string.input';
import { CommonInputProps } from '../types';

export type BoxModelInputProps = {
  value: EditorBoxModelSchema | undefined;
  onChange: (newValue: EditorBoxModelSchema | undefined) => void;
} & CommonInputProps;

export const BoxModelInput = ({
  value,
  onChange,
  ...props
}: BoxModelInputProps) => {
  return (
    <SimpleWrapper {...props}>
      <Card withBorder>
        <StringInput
          label="宽度"
          value={value?.w}
          onChange={(newValue) => {
            onChange({
              ...value,
              w: newValue,
            });
          }}
        />
        <StringInput
          label="高度"
          value={value?.h}
          onChange={(newValue) => {
            onChange({
              ...value,
              h: newValue,
            });
          }}
        />
        <StringInput
          label="上内边距"
          value={value?.pt}
          onChange={(newValue) => {
            onChange({
              ...value,
              pt: newValue,
            });
          }}
        />
        <StringInput
          label="右内边距"
          value={value?.pr}
          onChange={(newValue) => {
            onChange({
              ...value,
              pr: newValue,
            });
          }}
        />
        <StringInput
          label="下内边距"
          value={value?.pb}
          onChange={(newValue) => {
            onChange({
              ...value,
              pb: newValue,
            });
          }}
        />
        <StringInput
          label="左内边距"
          value={value?.pl}
          onChange={(newValue) => {
            onChange({
              ...value,
              pl: newValue,
            });
          }}
        />

        <StringInput
          label="上外边距"
          value={value?.mt}
          onChange={(newValue) => {
            onChange({
              ...value,
              mt: newValue,
            });
          }}
        />
        <StringInput
          label="右外边距"
          value={value?.mr}
          onChange={(newValue) => {
            onChange({
              ...value,
              mr: newValue,
            });
          }}
        />
        <StringInput
          label="下外边距"
          value={value?.mb}
          onChange={(newValue) => {
            onChange({
              ...value,
              mb: newValue,
            });
          }}
        />
        <StringInput
          label="左外边距"
          value={value?.ml}
          onChange={(newValue) => {
            onChange({
              ...value,
              ml: newValue,
            });
          }}
        />
      </Card>
    </SimpleWrapper>
  );
};
