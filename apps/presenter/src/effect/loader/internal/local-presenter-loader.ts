import { RouterState } from '@shukun/presenter/definition';
import { PresenterSchema } from '@shukun/schema';

export class LocalPresenterLoader {
  async load(router: RouterState): Promise<PresenterSchema> {
    const response = await fetch('/presenter/assets/presenter.json');
    const json = await response.json();

    return json;
  }
}
