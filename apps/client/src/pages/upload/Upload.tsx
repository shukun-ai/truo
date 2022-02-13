import { makeStyles } from '@material-ui/styles';
import { Card, Spin } from 'antd';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsFillFileCodeFill } from 'react-icons/bs';

import { uploadCodebase } from '../../models/developer';
import { FluidLayout } from '../layout/FluidLayout';

export interface UploadProps {}

export const Upload: FunctionComponent<UploadProps> = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      try {
        await uploadCodebase(formData);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <FluidLayout>
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
    </FluidLayout>
  );
};

const useStyles = makeStyles(() => ({
  box: {
    border: 'dashed 1px #ccc',
    background: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));
