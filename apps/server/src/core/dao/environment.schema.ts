import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

export interface IEnvironment {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  definition: Buffer;
}

export const environmentSchema = new Schema<IEnvironment>(
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
