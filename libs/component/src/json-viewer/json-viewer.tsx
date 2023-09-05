import { Box, MantineTheme, useMantineTheme } from '@mantine/core';
import { ObjectInspector, ObjectLabel } from 'react-inspector';

export type JsonViewerProps = {
  data: unknown;
  selected: string[];
  onClick: (selected: string[]) => void;
  rootLabel?: string;
  multiple?: boolean;
};

export const JsonViewer = ({
  data,
  onClick,
  rootLabel,
  selected,
  multiple,
}: JsonViewerProps) => {
  const mantineTheme = useMantineTheme();

  return (
    <Box>
      <ObjectInspector
        expandLevel={2}
        data={data}
        nodeRenderer={createNodeRenderer({
          onClick: (payload) =>
            onClick(handleClick(payload.path, selected, multiple ?? false)),
          rootLabel: rootLabel ? rootLabel : 'ROOT',
          selected,
          mantineTheme,
        })}
      />
    </Box>
  );
};

const handleClick = (
  path: string,
  selected: string[],
  multiple: boolean,
): string[] => {
  if (!multiple) {
    return [path];
  }

  if (selected.includes(path)) {
    return selected.filter((item) => item !== path);
  } else {
    return [...selected, path];
  }
};

const createNodeRenderer =
  ({
    onClick,
    rootLabel,
    selected,
    mantineTheme,
  }: {
    onClick: (payload: { path: string }) => void;
    rootLabel: string;
    selected: string[];
    mantineTheme: MantineTheme;
  }) =>
  ({ depth, name, data, isNonenumerable, path }: NodeData) =>
    depth === 0 ? (
      <span>{rootLabel}</span>
    ) : (
      <Box
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClick({ path });
        }}
        sx={{
          display: 'inline-block',
          cursor: 'pointer',
          borderRadius: mantineTheme.radius.sm,
        }}
        display="inline-block"
        bg={selected.includes(path) ? 'blue.2' : 'transparent'}
        px={4}
        py={2}
      >
        <ObjectLabel
          name={name}
          data={data}
          isNonenumerable={isNonenumerable}
        />
      </Box>
    );

type NodeData = {
  depth: number;
  name: string;
  data: unknown;
  isNonenumerable: unknown;
  expanded: boolean;
  path: string;
  shouldShowArrow: boolean;
  shouldShowPlaceholder: boolean;
  children: unknown;
  dataIterator: unknown;
  nodeRenderer: unknown;
  onClick: unknown;
};
