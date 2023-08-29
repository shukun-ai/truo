import { RouterState } from '@shukun/presenter/definition';
import { PresenterSchema } from '@shukun/schema';

import presenterJson from '../../../assets/presenter.json';

export class LocalPresenterLoader {
  async load(router: RouterState): Promise<PresenterSchema> {
    const json = presenterJson as unknown as PresenterSchema;
    // eslint-disable-next-line no-console
    console.log('local mode', json);
    return json;
  }
}
