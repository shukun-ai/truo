// @todo should be extracted into @shukun/schema and sync with runtime codebase
export interface AttachmentValue {
  mime: string;
  path: string;
  size: number;
  name: string;
}

// @see this type refers the API Usage of the shukun-dev/storage repository from README.
export interface StorageUploadResponse {
  value: {
    file: string;
    identify: string;
    md5: string;
    mimetype: string;
    orgId: string;
    size: number;
    success: boolean;
    url: string;
  }[];
}

export interface ImageSharpOptions {
  quality: number;
  width: number;
  height: number;
  format: string;
  progressive: boolean;
  crop: boolean;
  gravity: string;
}

export const getAttachmentUrl = (
  attachment: AttachmentValue,
  imageSharpOptions?: ImageSharpOptions,
) => {
  const url = `${process.env?.['NX_CLIENT_ASSETS_URL'] ?? ''}/oss`;
  const prefix = attachment.mime.startsWith('image/') ? 'images' : 'assets';
  const path = attachment.path;

  return `${url}/${prefix}/${path}`;
};
