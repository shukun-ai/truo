import { Injector, RouterState } from '@shukun/presenter/definition';

import { PresenterSchema } from '@shukun/schema';

export class ServerPresenterLoader {
  constructor(private readonly api: Injector['api']) {}

  async load(router: RouterState): Promise<PresenterSchema> {
    const response = await this.api.publicRequester.getPresenter(
      router.app,
      router.orgName,
    );

    return response.data.value;
  }
}
