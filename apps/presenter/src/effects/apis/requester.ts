import {
  AxiosAdaptor,
  DeveloperRequester,
  PublicRequester,
  SourceRequester,
  ViewRequester,
} from '@shukun/api';
import { UnknownSourceModel } from '@shukun/schema';
import { IApiRequester, IStore } from '@shukun/widget';

import { environment } from '../../environments/environment';

export class ApiRequester implements IApiRequester {
  readonly publicRequester: PublicRequester;
  readonly viewRequester: ViewRequester;
  readonly developerRequester: DeveloperRequester;

  private readonly adaptor: AxiosAdaptor;

  constructor(private readonly store: IStore) {
    this.adaptor = new AxiosAdaptor({
      baseUrl: `${environment.serverDomain}/apis/v1`,
      onOrgName: () => this.getOrgName(),
      onAccessToken: () => this.getAccessToken(),
    });
    this.publicRequester = new PublicRequester(this.adaptor);
    this.viewRequester = new ViewRequester(this.adaptor);
    this.developerRequester = new DeveloperRequester(this.adaptor);
  }

  createSourceRequester<Model extends UnknownSourceModel>(atomName: string) {
    return new SourceRequester<Model>(this.adaptor, atomName);
  }

  private getOrgName(): string | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const auth: any = this.store.getValue(
      { type: 'app', containerId: null, repositoryId: 'auth' },
      [],
    );
    return auth?.current?.orgName ?? null;
  }

  private getAccessToken(): string | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const auth: any = this.store.getValue(
      { type: 'app', containerId: null, repositoryId: 'auth' },
      [],
    );
    return auth?.current?.accessToken ?? null;
  }
}
