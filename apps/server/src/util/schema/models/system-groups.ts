import { IDString } from '@shukun/schema';

export class SystemGroupModel {
  label!: string;
  parent!: IDString;
  users!: IDString[];
  roles!: IDString[];
}
