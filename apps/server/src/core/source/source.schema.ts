import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

export interface ISource {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  definition: Buffer;
}

export const sourceSchema = new Schema<ISource>(
  {
    definition: {
      type: Buffer,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);
