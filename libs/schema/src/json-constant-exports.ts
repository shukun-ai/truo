import initialApplicationSeedDataJson from './json-constants/initial-application.json';
import { ApplicationSchema } from './types/application';

export const initialApplicationSeedData =
  initialApplicationSeedDataJson as ApplicationSchema;
