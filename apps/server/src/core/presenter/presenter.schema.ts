import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * @deprecated
 */
export const PresenterDocumentName = 'presenters';

/**
 * @deprecated
 */
export type PresenterDocument = Presenter & Document;

/**
 * @deprecated
 */
@Schema({ collection: PresenterDocumentName, timestamps: true })
export class Presenter {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  orgName!: string;

  @Prop({ required: true, type: 'Buffer' })
  definition!: Buffer;
}

export const PresenterSchema = SchemaFactory.createForClass(Presenter);
