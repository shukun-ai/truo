import { PresenterSchema } from '@shukun/schema';

export interface ISerializationService {
  parse(presenter: PresenterSchema): void;
}
