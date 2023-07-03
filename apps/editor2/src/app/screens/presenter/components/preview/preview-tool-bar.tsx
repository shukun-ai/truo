import { Badge, Box, Button, Group } from '@mantine/core';
import { IconExternalLink, IconRefresh } from '@tabler/icons-react';

export type PreviewToolBarProps = {
  //
};

export const PreviewToolBar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 16px',
      }}
    >
      <Box sx={{ flex: 1, marginRight: 12 }}>
        <Badge
          size="lg"
          fullWidth
          color="gray"
          sx={{
            textTransform: 'lowercase',
            textAlign: 'left',
          }}
        >
          xxx
        </Badge>
      </Box>
      <Group>
        <Button
          size="xs"
          variant="subtle"
          leftIcon={<IconExternalLink size="0.8rem" />}
        >
          使用独立窗口模式
        </Button>
        <Button
          size="xs"
          variant="filled"
          leftIcon={<IconRefresh size="0.8rem" />}
        >
          保存刷新后预览
        </Button>
      </Group>
    </Box>
  );
};
