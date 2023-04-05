import { makeStyles } from '@material-ui/styles';
import { LegacyFunctionComponent } from '@shukun/component';
import { Card, Spin } from 'antd';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsFillFileCodeFill } from 'react-icons/bs';

import { developerRequester } from '../../apis/requester';

import { FluidLayout } from '../layout/FluidLayout';

export interface UploadCodebaseProps {}

export const UploadCodebase: LegacyFunctionComponent<
  UploadCodebaseProps
> = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  // TODO if we want to extract more functions, we must create a new store to save loading.
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      try {
        await developerRequester.updateCodebase(formData);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card title="Upload your application JSON Schema" bordered={false}>
      <Spin spinning={loading}>
        <div className={classes.box} {...getRootProps()}>
          <input {...getInputProps()} />
          <BsFillFileCodeFill size="3em" style={{ marginRight: 16 }} />
          {isDragActive
            ? 'Drop the files here ...'
            : 'Drag drop some files here, or click to select files'}
        </div>
      </Spin>
    </Card>
  );
};

const useStyles = makeStyles(() => ({
  box: {
    border: 'dashed 1px #ccc',
    background: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));
