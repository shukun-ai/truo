import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DataSourceSchema } from '@shukun/schema';
import { Document } from 'mongoose';

/**
 * @deprecated
 */
export const OrgDocumentName = 'orgs';

/**
 * @deprecated
 */
export type OrgDocument = Org & Document;

/**
 * @deprecated
 */
@Schema({ collection: OrgDocumentName, timestamps: true })
export class Org {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: true })
  label!: string;

  @Prop()
  lightLogo?: string;

  @Prop()
  darkLogo?: string;

  @Prop()
  mainColor?: string;

  @Prop({ type: 'Buffer' })
  codebase?: Buffer;

  @Prop({ type: 'Buffer' })
  compiledCodes?: Buffer;

  @Prop({ type: 'Mixed' })
  dataSource?: DataSourceSchema;

  @Prop({ type: 'Buffer' })
  migrated?: Buffer;

  @Prop({ type: 'Buffer' })
  players?: Buffer;
}

export const OrgSchema = SchemaFactory.createForClass(Org);
