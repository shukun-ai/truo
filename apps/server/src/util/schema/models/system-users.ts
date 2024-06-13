import { AttachmentSchema } from '@shukun/schema';

export class SystemUserModel {
  username!: string;
  displayName!: string;
  avatar?: AttachmentSchema[];
}
