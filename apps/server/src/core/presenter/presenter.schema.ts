import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

export const PresenterDocumentName = 'presenters';

export interface IPresenter {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  orgName: string;
  definition: Buffer;
}

export const presenterSchema = new Schema<IPresenter>(
  {
    name: { type: String, required: true },
    orgName: { type: String, required: true },
    definition: { type: 'Buffer', required: true },
  },
  {
    timestamps: true,
    collection: PresenterDocumentName,
  },
);

export const PresenterModel = model<IPresenter>(
  PresenterDocumentName,
  presenterSchema,
);
