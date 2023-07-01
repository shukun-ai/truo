import { Box, Button, Text } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';

import { EventForm } from './event-form';

export type EventDetailProps = {
  containerName: string;
  event: PresenterEvent;
  onChange: (event: PresenterEvent) => void;
};

export const EventDetail = ({
  containerName,
  event,
  onChange,
}: EventDetailProps) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <EventForm
        containerName={containerName}
        event={event}
        onChange={(values) => {
          onChange(values);
          setEditing(false);
        }}
        onCancel={() => {
          setEditing(false);
        }}
      />
    );
  } else {
    return <EventLabel event={event} onEdit={() => setEditing(true)} />;
  }
};

const EventLabel = ({
  event,
  onEdit,
}: {
  event: PresenterEvent;
  onEdit: () => void;
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        variant="light"
        size="sm"
        leftIcon={<IconEdit />}
        onClick={onEdit}
      >
        编辑
      </Button>
      <Text sx={{ marginLeft: 12 }}>
        执行数据仓库 {event.target} 的方法 {event.action}
      </Text>
    </Box>
  );
};
