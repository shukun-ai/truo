import {
  DeveloperRequester,
  PublicRequester,
  SourceRequester,
  ViewRequester,
  EditorRequester,
} from '@shukun/api';
import { UnknownSourceModel } from '@shukun/schema';

export interface IApiRequester {
  readonly publicRequester: PublicRequester;
  readonly viewRequester: ViewRequester;
  readonly developerRequester: DeveloperRequester;
  readonly editorRequester: EditorRequester;

  createSourceRequester<Model extends UnknownSourceModel>(
    atomName: string,
  ): SourceRequester<Model>;
}
