import { DataSourceSchema } from '@shukun/schema';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

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
  dbUri?: string;
  dbPrefix?: string;
  dbMinPoolSize?: number;
  dbMaxPoolSize?: number;
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
    dbUri: { type: String },
    dbPrefix: { type: String },
    dbMinPoolSize: { type: Number },
    dbMaxPoolSize: { type: Number },
  },
  {
    timestamps: true,
    collection: OrgDocumentName,
  },
);
