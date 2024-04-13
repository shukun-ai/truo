import { DataSourceSchema } from '@shukun/schema';
import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

export const OrgDocumentName = 'orgs';

export interface IOrg {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  label: string;
  lightLogo?: string;
  darkLogo?: string;
  mainColor?: string;
  codebase?: Buffer;
  compiledCodes?: Buffer;
  dataSource?: DataSourceSchema;
  migrated?: Buffer;
  presenters?: Buffer;
  database?: string;
}

export const orgSchema = new Schema<IOrg>(
  {
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    lightLogo: { type: String },
    darkLogo: { type: String },
    mainColor: { type: String },
    codebase: { type: 'Buffer' },
    compiledCodes: { type: 'Buffer' },
    dataSource: { type: 'Mixed' },
    migrated: { type: 'Buffer' },
    presenters: { type: 'Buffer' },
    database: { type: String },
  },
  {
    timestamps: true,
    collection: OrgDocumentName,
  },
);

export const OrgModel = model<IOrg>(OrgDocumentName, orgSchema);
