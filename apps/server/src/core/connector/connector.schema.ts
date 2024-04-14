import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

export interface IConnector {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  definition: Buffer;
}

export const connectorSchema = new Schema<IConnector>(
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
