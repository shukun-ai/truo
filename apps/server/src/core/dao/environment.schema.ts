import { Schema } from 'mongoose';

export const environmentMongoSchema = new Schema(
  {
    definition: {
      type: Buffer,
      require: true,
    },
  },
  { timestamps: true },
);

export type EnvironmentDocument = {
  definition: Buffer;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};
