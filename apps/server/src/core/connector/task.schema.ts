import { Schema } from 'mongoose';

export const taskMongoSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    definition: {
      type: Buffer,
    },
  },
  { timestamps: true },
);

export type ConnectorDocument = {
  name: string;
  definition: Buffer;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};
