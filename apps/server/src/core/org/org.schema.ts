import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const OrgDocumentName = 'orgs';

export type OrgDocument = Org & Document;

@Schema({ collection: OrgDocumentName, timestamps: true })
export class Org {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  label: string;

  @Prop()
  lightLogo?: string;

  @Prop()
  darkLogo?: string;

  @Prop()
  mainColor?: string;

  @Prop({ type: 'Buffer' })
  codebase?: Buffer;
}

export const OrgSchema = SchemaFactory.createForClass(Org);
