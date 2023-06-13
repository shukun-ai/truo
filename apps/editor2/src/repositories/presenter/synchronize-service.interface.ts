import { PresenterSchema } from '@shukun/schema';

export interface ISynchronizeService {
  save(presenter: PresenterSchema): Promise<void>;
}
