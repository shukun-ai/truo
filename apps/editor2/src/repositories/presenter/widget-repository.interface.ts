import { PresenterSchema } from '@shukun/schema';

export interface IWidgetRepository {
  upsertByContainer(presenter: PresenterSchema): void;
}
