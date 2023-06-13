import { PresenterSchema } from '@shukun/schema';

export interface IDeserializationService {
  build(): PresenterSchema;
}
