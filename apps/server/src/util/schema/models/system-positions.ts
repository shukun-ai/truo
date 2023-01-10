import { IDString } from '@shukun/schema';

export class SystemPositionModel {
  name!: string;
  label!: string;
  users!: IDString[];
  roles!: IDString[];
}
