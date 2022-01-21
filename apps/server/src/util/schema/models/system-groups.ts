import { IDString } from '../../../app.type';

export class SystemGroupModel {
  label!: string;
  parent!: IDString;
  users!: IDString[];
  roles!: IDString[];
}
