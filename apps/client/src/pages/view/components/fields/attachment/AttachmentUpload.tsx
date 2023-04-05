import { UploadOutlined } from '@ant-design/icons';
import { LegacyFunctionComponent } from '@shukun/component';
import { Button, FormInstance, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  AttachmentValue,
  StorageUploadResponse,
} from '../../../../../utils/attachment-helpers';

import { useUploadRequestParams } from './useUploadRequestParams';

export interface AttachmentUploadProps {
  form: FormInstance<any>;
  name: string;
  disabled?: boolean;
  value: AttachmentValue[] | undefined;
  limitUpload: number;
}

export const AttachmentUpload: LegacyFunctionComponent<
  AttachmentUploadProps
> = ({ form, name: formName, disabled, value, limitUpload }) => {
  const [fileList, setFileList] = useState<UploadFile<StorageUploadResponse>[]>(
    [],
  );

  const handleChange = useCallback<
    (info: UploadChangeParam<UploadFile<StorageUploadResponse>>) => void
  >(
    (info) => {
      const fileList = info.fileList;

      if (info.file.status === 'done') {
        const { name, type, size, response } = info.file;

        if (!type || !size || !response || response.value.length < 1) {
          throw new Error(
            '不存在 file type, size 和 response，上传不成功，请重新上传。',
          );
        }

        const attachment: AttachmentValue = {
          name: name,
          mime: type,
          size: size,
          path: response.value[0].identify,
        };
        const current = form.getFieldValue(formName);
        const currentValue = Array.isArray(current) ? current : [];
        const newAttachment = [...currentValue, attachment];
        form.setFieldsValue({ [formName]: newAttachment });

        // Remove file from file list if the file is uploaded.
        const index = fileList.findIndex((item) => item.uid === info.file.uid);

        if (index >= 0) {
          fileList.splice(index, 1);
        }
      }

      setFileList([...fileList]);
    },
    [formName, form],
  );

  const uploadedCount = useMemo(() => {
    return (value || []).length;
  }, [value]);

  const requestParams = useUploadRequestParams();

  if (!requestParams) {
    return <></>;
  }

  return (
    <Upload
      action={requestParams.action}
      name="files"
      listType="text"
      multiple={limitUpload > 1}
      // TODO: remove ts-ignore
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fileList={fileList}
      headers={{
        Authorization: `Bearer ${requestParams.token}`,
      }}
      data={{
        orgId: requestParams.orgId,
        orgName: requestParams.orgName,
      }}
      onChange={handleChange}
    >
      <Button
        icon={<UploadOutlined />}
        disabled={disabled || uploadedCount >= limitUpload}
      >
        点击上传
      </Button>
    </Upload>
  );
};
