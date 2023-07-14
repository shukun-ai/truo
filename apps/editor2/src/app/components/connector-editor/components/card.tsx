import { Card as BaseCard, Flex, Group } from '@mantine/core';

import { ReactNode } from 'react';
import { NodeProps } from 'reactflow';

import { NodeData } from '../helpers/data-transfer';

export type CardProps = NodeProps<NodeData> & {
  label: ReactNode;
  more?: ReactNode;
  children?: ReactNode;
};

export const Card = ({ data, more, label, children }: CardProps) => {
  return (
    <BaseCard
      withBorder
      sx={{
        width: data.ui.width,
        height: data.ui.height,
      }}
    >
      <BaseCard.Section withBorder inheritPadding py="xs">
        <Flex justify="space-between">
          {label}
          {more}
        </Flex>
      </BaseCard.Section>
      {children && <BaseCard.Section>{children}</BaseCard.Section>}
    </BaseCard>
  );
};
