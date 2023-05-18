import {
  DeveloperRequester,
  PublicRequester,
  SourceRequester,
  ViewRequester,
} from '@shukun/api';
import { UnknownSourceModel } from '@shukun/schema';

export interface IApiRequester {
  readonly publicRequester: PublicRequester;
  readonly viewRequester: ViewRequester;
  readonly developerRequester: DeveloperRequester;

  createSourceRequester<Model extends UnknownSourceModel>(
    atomName: string,
  ): SourceRequester<Model>;
}
