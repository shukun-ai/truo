import { MetadataSchema } from '@shukun/schema';
import { Button } from 'antd';
import { cloneDeep } from 'lodash';
import React, { FunctionComponent, useCallback, useRef, useState } from 'react';

import { metadataQuery, metadataCommand } from '../../services/metadata';

import {
  pickDirectory,
  readDirectoryJson,
  parseJsonContents,
  saveJsonToFile,
} from '../../utils/file-system';

export interface ChooseDirectoryProps {}

export const ChooseDirectory: FunctionComponent<ChooseDirectoryProps> = () => {
  const entryHandleRef = useRef<FileSystemDirectoryHandle>();

  const handleClick = useCallback(async () => {
    const entryHandle = await pickDirectory();

    entryHandleRef.current = entryHandle;

    const metadata = parseJsonContents<MetadataSchema>(
      await readDirectoryJson(entryHandle, 'metadata'),
    );

    metadataCommand.set(metadata);

    console.log('metadata', metadata);
  }, []);

  const handleSave = useCallback(async () => {
    if (!entryHandleRef.current) {
      return;
    }

    const entryHandle = entryHandleRef.current;

    const atom = metadataQuery.getAtom('vehicles');

    const cloneAtom = cloneDeep(atom);

    cloneAtom.label = 'new atom vehicles';

    const text = JSON.stringify(cloneAtom, null, 2);

    saveJsonToFile(entryHandle, text + '\n', 'metadata', 'vehicles');
  }, []);

  return (
    <div>
      <Button onClick={handleClick}>选择目录</Button>
      <Button onClick={handleSave}>保存文件</Button>
    </div>
  );
};
