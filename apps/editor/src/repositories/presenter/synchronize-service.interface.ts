import { IDString, PresenterSchema } from '@shukun/schema';

export interface ISynchronizeService {
  create(presenterName: string): Promise<{ _id: IDString }>;
  update(presenterName: string, definition: PresenterSchema): Promise<void>;
  findMany(): Promise<Record<string, PresenterSchema>>;
  findOne(presenterName: string): Promise<PresenterSchema>;
}
