import { makeStyles } from '@material-ui/styles';
import { LegacyFunctionComponent } from '@shukun/component';
import { Card, message, Spin } from 'antd';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsFillFileCodeFill } from 'react-icons/bs';

import { developerRequester } from '../../apis/requester';

export interface UploadDataSourceProps {}

export const UploadDataSource: LegacyFunctionComponent<
  UploadDataSourceProps
> = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  // TODO if we want to extract more functions, we must create a new store to save loading.
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setLoading(true);

      const reader = new FileReader();

      reader.onload = function () {
        const text = reader.result;
        if (typeof text === 'string') {
          const json = JSON.parse(text);
          developerRequester.updateDataSource(json).finally(() => {
            setLoading(false);
          });
        } else {
          message.error('导入的文件无法解析成文本');
          setLoading(false);
        }
      };

      if (acceptedFiles[0]) {
        reader.readAsText(acceptedFiles[0]);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card title="Upload your Data Source Schema" bordered={false}>
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
