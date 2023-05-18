import { RoleResourceType, PresenterSchema } from '@shukun/schema';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';

export class EditorRequester {
  constructor(private readonly requestAdaptor: IRequestAdaptor) {}

  /**
   * @remarks
   * POST /apis/v1/editor/{orgName}/presenter
   */
  public async getPresenter() {
    return await this.requestAdaptor.fetch<Record<string, PresenterSchema>>(
      'POST',
      this.buildUri('presenter'),
    );
  }

  private buildUri(suffix: string) {
    return `${RoleResourceType.Editor}/:orgName/${suffix}`;
  }
}
