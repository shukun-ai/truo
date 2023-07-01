import { Box, Button, Text } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import { remove, update, useEventContext } from './event-context';
import { EventForm } from './event-form';

export type EventDetailProps = {
  containerName: string;
  event: PresenterEvent;
  onChange: (event: PresenterEvent) => void;
  onRemove: () => void;
};

export const EventDetail = () => {
  const { containerName, events, event, index, onChange } = useEventContext();

  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <EventForm
        containerName={containerName}
        event={event}
        onChange={(value) => {
          onChange(update(events, index, value));
          setEditing(false);
        }}
        onCancel={() => {
          setEditing(false);
        }}
      />
    );
  } else {
    return (
      <EventLabel
        event={event}
        onEdit={() => setEditing(true)}
        onRemove={() => {
          onChange(remove(events, index));
          setEditing(false);
        }}
      />
    );
  }
};

const EventLabel = ({
  event,
  onEdit,
  onRemove,
}: {
  event: PresenterEvent;
  onEdit: () => void;
  onRemove: () => void;
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        variant="light"
        size="xs"
        leftIcon={<IconEdit size="0.9rem" />}
        onClick={onEdit}
      >
        编辑
      </Button>
      <Button
        variant="light"
        size="xs"
        leftIcon={<IconTrash size="0.9rem" />}
        onClick={onRemove}
      />
      <Text sx={{ marginLeft: 12 }}>
        执行数据仓库 {event.target} 的方法 {event.action}
      </Text>
    </Box>
  );
};
