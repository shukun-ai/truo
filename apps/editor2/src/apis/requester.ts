import {
  AxiosAdaptor,
  DeveloperRequester,
  EditorRequester,
  PublicRequester,
  SourceRequester,
  ViewRequester,
} from '@shukun/api';
import { UnknownSourceModel } from '@shukun/schema';

import { environment } from '../environments/environment';
import { AuthStore } from '../repositories/auth/auth-store';

import { IApiRequester } from './requester.interface';

export class ApiRequester implements IApiRequester {
  readonly publicRequester: PublicRequester;
  readonly viewRequester: ViewRequester;
  readonly developerRequester: DeveloperRequester;
  readonly editorRequester: EditorRequester;

  private readonly adaptor: AxiosAdaptor;

  constructor(private readonly authStore: AuthStore) {
    this.adaptor = new AxiosAdaptor({
      baseUrl: `${environment.serverDomain}/apis/v1`,
      onOrgName: () => this.getOrgName(),
      onAccessToken: () => this.getAccessToken(),
    });
    this.publicRequester = new PublicRequester(this.adaptor);
    this.viewRequester = new ViewRequester(this.adaptor);
    this.developerRequester = new DeveloperRequester(this.adaptor);
    this.editorRequester = new EditorRequester(this.adaptor);
  }

  createSourceRequester<Model extends UnknownSourceModel>(atomName: string) {
    return new SourceRequester<Model>(this.adaptor, atomName);
  }

  private getOrgName(): string | null {
    const { currentUser } = this.authStore.getValue();
    return currentUser?.orgName ?? null;
  }

  private getAccessToken(): string | null {
    const { currentUser } = this.authStore.getValue();
    return currentUser?.accessToken ?? null;
  }
}
