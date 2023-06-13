import { RoleResourceType, PresenterSchema, IDString } from '@shukun/schema';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';

export class EditorRequester {
  constructor(private readonly requestAdaptor: IRequestAdaptor) {}

  /**
   * @remarks
   * POST /apis/v1/editor/{orgName}/presenters/:presenterId/query
   */
  public async getPresenter(presenterName: string) {
    return await this.requestAdaptor.fetch<PresenterSchema>(
      'POST',
      this.buildUri(`presenters/${presenterName}/query`),
    );
  }

  /**
   * @remarks
   * POST /apis/v1/editor/{orgName}/presenters/any/query
   */
  public async getPresenters() {
    return await this.requestAdaptor.fetch<Record<string, PresenterSchema>>(
      'POST',
      this.buildUri(`presenters/any/query`),
    );
  }

  /**
   * @remarks
   * POST /apis/v1/editor/{orgName}/presenters/:presenterId
   */
  public async createPresenter(presenterName: string) {
    return await this.requestAdaptor.fetch<{ _id: IDString }>(
      'POST',
      this.buildUri(`presenters/any/create`),
      {
        body: { presenterName },
      },
    );
  }

  /**
   * @remarks
   * POST /apis/v1/editor/{orgName}/presenters/:presenterId
   */
  public async updatePresenter(
    presenterName: string,
    definition: PresenterSchema,
  ) {
    return await this.requestAdaptor.fetch<PresenterSchema>(
      'POST',
      this.buildUri(`presenters/${presenterName}/update`),
      {
        body: {
          definition,
        },
      },
    );
  }

  /**
   * @remarks
   * POST /apis/v1/editor/{orgName}/presenters/:presenterId
   */
  public async deletePresenter(presenterName: string) {
    return await this.requestAdaptor.fetch<PresenterSchema>(
      'POST',
      this.buildUri(`presenters/${presenterName}/delete`),
    );
  }

  private buildUri(suffix: string) {
    return `${RoleResourceType.Editor}/:orgName/${suffix}`;
  }
}
