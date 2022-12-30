import { FlowSchema, MetadataSchema } from '@shukun/schema';
import { Button } from 'antd';
import React, { FunctionComponent, useCallback } from 'react';

import { fileCommand } from '../../services/file';

import { flowCommand } from '../../services/flow';

import { metadataCommand } from '../../services/metadata';

import { readDirectoryJson, parseJsonContents } from '../../utils/file-system';

export interface ChooseDirectoryProps {}

export const ChooseDirectory: FunctionComponent<ChooseDirectoryProps> = () => {
  const handleClick = useCallback(async () => {
    const entryHandle = await fileCommand.openEntryHandle();

    const metadata = parseJsonContents<MetadataSchema>(
      await readDirectoryJson(entryHandle, 'metadata'),
    );

    metadataCommand.setAll(metadata);

    const flows = parseJsonContents<FlowSchema>(
      await readDirectoryJson(entryHandle, 'flows'),
    );

    flowCommand.setAll(flows);
  }, []);

  return (
    <div style={{ backgroundColor: '#000' }}>
      <Button onClick={handleClick}>选择目录</Button>
    </div>
  );
};
