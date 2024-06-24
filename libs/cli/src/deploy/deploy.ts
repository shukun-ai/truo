import { readFile } from 'fs/promises';

import { DeveloperRequester, IRequestAdaptor } from '@shukun/api';

import { DataSourceSchema } from '@shukun/schema';

export class DeployCodebase {
  async uploadCodebase(filepath: string, adaptor: IRequestAdaptor) {
    const developerRequester = new DeveloperRequester(adaptor);
    const file = await readFile(filepath, { encoding: 'utf8' });
    const codebase = new Blob([file]);

    const formData = this.convertJsonToFormData(codebase);
    await developerRequester.updateCodebase(formData, {
      'content-type': 'multipart/form-data',
    });
  }

  async uploadDataSource(filepath: string, adaptor: IRequestAdaptor) {
    const developerRequester = new DeveloperRequester(adaptor);
    const file = await readFile(filepath, { encoding: 'utf8' });
    const dataSource: DataSourceSchema = JSON.parse(file);
    await developerRequester.updateDataSource(dataSource);
  }

  private convertJsonToFormData(codebase: Blob): FormData {
    const formData = new FormData();
    formData.append('file', codebase, 'application.json');
    return formData;
  }
}
