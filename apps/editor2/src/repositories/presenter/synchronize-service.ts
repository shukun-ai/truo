import { IDString, PresenterSchema } from '@shukun/schema';

import { ApiRequester } from '../../apis/requester';

import { ISynchronizeService } from './synchronize-service.interface';

export class SynchronizeService implements ISynchronizeService {
  constructor(private readonly apiRequester: ApiRequester) {}

  async create(presenterName: string): Promise<{ _id: IDString }> {
    const response = await this.apiRequester.editorRequester.createPresenter(
      presenterName,
    );
    return response.data.value;
  }

  async update(
    presenterName: string,
    definition: PresenterSchema,
  ): Promise<void> {
    await this.apiRequester.editorRequester.updatePresenter(
      presenterName,
      definition,
    );
  }

  async findMany(): Promise<Record<string, PresenterSchema>> {
    const response = await this.apiRequester.editorRequester.getPresenters();
    return response.data.value;
  }

  async findOne(presenterName: string): Promise<PresenterSchema> {
    const response = await this.apiRequester.editorRequester.getPresenter(
      presenterName,
    );
    return response.data.value;
  }
}
