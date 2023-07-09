import { Schema } from 'mongoose';

export const connectorMongoSchema = new Schema(
  {
    unique: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    content: {
      type: Buffer,
    },
  },
  { timestamps: true },
);

export type ConnectorDocument = {
  name: string;
  content: Buffer;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};
