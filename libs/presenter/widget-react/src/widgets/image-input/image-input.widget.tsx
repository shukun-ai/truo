import { Avatar, Box, Flex, Input, UnstyledButton } from '@mantine/core';
import {
  imageInputDefinition,
  ImageInputDefinitionProps,
} from '@shukun/presenter/definition';
import { IconCameraPlus } from '@tabler/icons-react';
import { useRef } from 'react';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const ImageInputWidget = createWidget<ImageInputDefinitionProps>(
  imageInputDefinition,
  (props) => {
    const square = 100;

    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
      <Input.Wrapper
        {...extractBase}
        required={props.required}
        label={props.label}
        description={props.helper}
      >
        <Flex
          gap="xs"
          mih={square}
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <Box w={square} h={square}>
            <Avatar w={square} h={square} color="blue" radius="xs">
              照片
            </Avatar>
          </Box>
          <Box w={square} h={square}>
            <UnstyledButton onClick={() => fileInputRef.current?.click()}>
              <Avatar w={square} h={square} radius="xs">
                <IconCameraPlus size="2rem" />
              </Avatar>
            </UnstyledButton>
          </Box>
        </Flex>
        <Box display="none">
          <Input ref={fileInputRef} type="file" />
        </Box>
      </Input.Wrapper>
    );
  },
);
