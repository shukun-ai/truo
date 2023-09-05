import { ActionIcon, Badge, Box, Group, Text, Tooltip } from '@mantine/core';

import { modals } from '@mantine/modals';
import { PresenterEvent } from '@shukun/schema';
import { useCallback, useMemo, useState } from 'react';

import { Icon } from '../../domain-icons/domain-icons';
import { JsonViewer } from '../../json-viewer/json-viewer';

import { useEventContext } from './context';

export type PathInputProps = {
  value: PresenterEvent['path'];
  onChange: (newValue: PresenterEvent['path']) => void;
  target: PresenterEvent['target'];
};

export const PathInput = ({ value, onChange, target }: PathInputProps) => {
  const { devtoolLogs } = useEventContext();
  const state = (devtoolLogs.state as any)?.[target];

  const content = useMemo(() => {
    if (!value || value.length === 0) {
      return `$.${target}`;
    } else {
      return `$.${target}.${value.join('.')}`;
    }
  }, [target, value]);

  const onSubmit = useCallback(
    (path: string[]) => {
      onChange(path);
      modals.closeAll();
    },
    [onChange],
  );

  const open = useCallback(() => {
    modals.open({
      title: '更换路径',
      children: (
        <PathPopup
          onSubmit={onSubmit}
          data={{
            [target]: state,
          }}
          target={target}
          path={value ?? []}
        />
      ),
    });
  }, [onSubmit, state, target, value]);

  return (
    <Box>
      <Group>
        <Text size="sm">赋值路径</Text>
        <Tooltip label="点击更换路径">
          <Badge tt="none" size="lg" sx={{ cursor: 'pointer' }} onClick={open}>
            {content}
          </Badge>
        </Tooltip>
        <Tooltip label="点击更换路径">
          <ActionIcon onClick={open}>
            <Icon type="edit" size="1rem" />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Box>
  );
};

type PathPopupProps = {
  onSubmit: (path: string[]) => void;
  data: unknown;
  target: string;
  path: string[];
};

const PathPopup = ({ onSubmit, data, target, path }: PathPopupProps) => {
  const [cache, setCache] = useState(path);

  return (
    <JsonViewer
      data={data}
      rootLabel={'数据仓库'}
      selected={parseValue(target, cache)}
      onClick={(selected) => {
        const newValue = handleClick(selected);
        onSubmit(newValue);
        setCache(newValue);
      }}
    />
  );
};

const parseValue = (target: string, value: string[]): string[] => {
  const fullPath = [target, ...value].join('.');
  const jsonViewerPath = [`$.${fullPath}`];
  return jsonViewerPath;
};

const handleClick = (selected: string[]): string[] => {
  if (selected.length !== 1) {
    throw new Error();
  }
  const fullPath = selected[0].split('.');
  return fullPath.splice(2, fullPath.length);
};
