import { Box } from '@mantine/core';
import { ObjectInspector, ObjectLabel } from 'react-inspector';

export type JsonViewerProps = {
  data: unknown;
  onClick: (payload: { path: string }) => void;
  rootLabel: string;
};

export const JsonViewer = ({ data, onClick, rootLabel }: JsonViewerProps) => {
  return (
    <Box>
      <ObjectInspector
        expandLevel={2}
        data={data}
        nodeRenderer={createNodeRenderer({
          onClick: (payload) => onClick(payload),
          rootLabel,
        })}
      />
    </Box>
  );
};

const createNodeRenderer =
  ({
    onClick,
    rootLabel,
  }: {
    onClick: (payload: { path: string }) => void;
    rootLabel: string;
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
        sx={{ display: 'inline-block', cursor: 'pointer' }}
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
