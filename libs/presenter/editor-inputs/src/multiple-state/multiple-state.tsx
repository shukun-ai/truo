import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Text,
  Tooltip,
} from '@mantine/core';

import { modals } from '@mantine/modals';
import { Icon, JsonViewer } from '@shukun/component';

import {
  arrayPathToString,
  multipleArrayPathToMultipleString,
  multipleStringPathToMultipleArray,
} from '@shukun/util-functions';
import { useCallback, useState } from 'react';

import { SimpleWrapper } from '../simple-wrapper/simple-wrapper';
import { CommonInputProps } from '../types';

export type MultipleStateProps = {
  value: string[][] | undefined;
  onChange: (newValue: string[][]) => void;
} & CommonInputProps;

export const MultipleState = ({
  value = [],
  onChange,
  logs,
  ...props
}: MultipleStateProps) => {
  const onSubmit = useCallback(
    (path: string[][]) => {
      onChange(path);
      modals.closeAll();
    },
    [onChange],
  );

  const open = useCallback(() => {
    modals.open({
      title: '选择状态',
      children: (
        <Popup
          onSubmit={onSubmit}
          data={(logs ?? {}).state}
          multipleArrayPath={value ?? []}
        />
      ),
    });
  }, [logs, onSubmit, value]);

  return (
    <SimpleWrapper logs={logs} {...props}>
      <Group spacing={4}>
        {value.length === 0 && <Text>未监听状态</Text>}
        {value.map((item) => (
          <Badge
            tt="none"
            size="lg"
            sx={{ cursor: 'pointer' }}
            key={JSON.stringify(item)}
          >
            {arrayPathToString(item, '$')}
          </Badge>
        ))}
        <Tooltip label="点击选择状态">
          <ActionIcon onClick={open}>
            <Icon type="edit" size="1rem" />
          </ActionIcon>
        </Tooltip>
      </Group>
    </SimpleWrapper>
  );
};

type PopupProps = {
  onSubmit: (multipleArrayPath: string[][]) => void;
  data: unknown;
  multipleArrayPath: string[][];
};

const Popup = ({ onSubmit, data, multipleArrayPath }: PopupProps) => {
  const [cache, setCache] = useState(multipleArrayPath);

  return (
    <Box>
      <Card withBorder mb={16}>
        <JsonViewer
          data={data}
          rootLabel={'全部状态'}
          selected={multipleArrayPathToMultipleString(cache, '$')}
          onClick={(selected) => {
            const newValue = multipleStringPathToMultipleArray(selected, '$');
            setCache(newValue);
          }}
          multiple
        />
      </Card>
      <Group align="center" mb={16}>
        <Icon type="info" size="1rem" />
        <Text size="sm">您可以同时选中多个状态，两次点击则取消选中。</Text>
      </Group>
      <Button
        fullWidth
        onClick={() => {
          onSubmit(cache);
        }}
      >
        确定
      </Button>
    </Box>
  );
};
