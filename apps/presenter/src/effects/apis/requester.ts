import {
  AxiosAdaptor,
  DeveloperRequester,
  PublicRequester,
  SourceRequester,
  ViewRequester,
} from '@shukun/api';
import { UnknownSourceModel } from '@shukun/schema';
import { IApiRequester } from '@shukun/widget';

import { environment } from '../../environments/environment';
import { IAuthStorage } from '../storages/auth-storage.interface';

export class ApiRequester implements IApiRequester {
  readonly publicRequester: PublicRequester;
  readonly viewRequester: ViewRequester;
  readonly developerRequester: DeveloperRequester;

  private readonly adaptor: AxiosAdaptor;

  constructor(private readonly authStorage: IAuthStorage) {
    this.adaptor = new AxiosAdaptor({
      baseUrl: `${environment.serverDomain}/apis/v1`,
      onOrgName: () => this.authStorage.get()?.orgName ?? null,
      onAccessToken: () => this.authStorage.get()?.accessToken ?? null,
    });
    this.publicRequester = new PublicRequester(this.adaptor);
    this.viewRequester = new ViewRequester(this.adaptor);
    this.developerRequester = new DeveloperRequester(this.adaptor);
  }

  createSourceRequester<Model extends UnknownSourceModel>(atomName: string) {
    return new SourceRequester<Model>(this.adaptor, atomName);
  }
}
