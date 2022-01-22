import { makeStyles } from '@material-ui/styles';
import { Card } from 'antd';
import React, { FunctionComponent, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsFillFileCodeFill } from 'react-icons/bs';

import { uploadCodebase } from '../../models/developer';
import { FluidLayout } from '../layout/FluidLayout';

export interface UploadProps {}

export const Upload: FunctionComponent<UploadProps> = () => {
  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      uploadCodebase(formData);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <FluidLayout>
      <Card title="Upload your application JSON Schema" bordered={false}>
        <div className={classes.box} {...getRootProps()}>
          <input {...getInputProps()} />
          <BsFillFileCodeFill size="3em" style={{ marginRight: 16 }} />
          {isDragActive
            ? 'Drop the files here ...'
            : 'Drag drop some files here, or click to select files'}
        </div>
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
