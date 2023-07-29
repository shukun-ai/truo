import { IDString, PresenterSchema } from '@shukun/schema';

import { ApiRequester } from '../../apis/requester';

import { ISynchronizeService } from './synchronize-service.interface';

export class SynchronizeService implements ISynchronizeService {
  constructor(private readonly apiRequester: ApiRequester) {}

  async create(presenterName: string): Promise<{ _id: IDString }> {
    const response = await this.apiRequester.developerRequester.createPresenter(
      presenterName,
    );
    return response.data.value;
  }

  async update(
    presenterName: string,
    definition: PresenterSchema,
  ): Promise<void> {
    await this.apiRequester.developerRequester.updatePresenter(
      presenterName,
      definition,
    );
  }

  async findMany(): Promise<Record<string, PresenterSchema>> {
    const response = await this.apiRequester.developerRequester.getPresenters();
    return response.data.value;
  }

  async findOne(presenterName: string): Promise<PresenterSchema> {
    const response = await this.apiRequester.developerRequester.getPresenter(
      presenterName,
    );
    return response.data.value;
  }
}
