import { Schema } from 'mongoose';

export const connectorMongoSchema = new Schema(
  {
    definition: {
      type: Buffer,
      require: true,
    },
  },
  { timestamps: true },
);

export type ConnectorDocument = {
  definition: Buffer;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};
