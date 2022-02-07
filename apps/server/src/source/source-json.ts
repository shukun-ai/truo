import { Document } from 'mongoose';

import { JsonModel } from '../app.type';

export function sourceToJSON<Model>(
  value: Model & Document<any>,
): JsonModel<Model> {
  const json = JSON.parse(JSON.stringify(value.toJSON()));
  return json as JsonModel<Model>;
}
