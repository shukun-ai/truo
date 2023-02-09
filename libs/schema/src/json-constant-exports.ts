import applicationSeedDataJson from './json-constants/initial-application.json';
import { ApplicationSchema } from './types/application';

export const applicationSeedData = applicationSeedDataJson as ApplicationSchema;
