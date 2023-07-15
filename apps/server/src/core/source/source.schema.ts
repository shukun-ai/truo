import { Schema } from 'mongoose';

export const sourceMongoSchema = new Schema(
  {
    definition: {
      type: Buffer,
      require: true,
    },
  },
  { timestamps: true },
);

export type SourceDocument = {
  definition: Buffer;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};
