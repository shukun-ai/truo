import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

export interface ITask {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  definition: Buffer;
}

export const taskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    definition: {
      type: Buffer,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);
