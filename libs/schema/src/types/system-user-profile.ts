import { AttachmentSchema } from './attachments';

export type SystemUserProfile = {
  userId: string;
  orgName: string;
  username: string;
  displayName: string;
  avatar?: AttachmentSchema[];
};
