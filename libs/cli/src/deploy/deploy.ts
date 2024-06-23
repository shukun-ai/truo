import { readFile } from 'fs/promises';

import { AxiosAdaptor, DeveloperRequester } from '@shukun/api';

export class DeployCodebase {
  async run(
    filepath: string,
    options: {
      baseUrl: string;
      orgName: string;
      accessToken?: string;
    },
  ) {
    const adaptor = new AxiosAdaptor({
      baseUrl: options.baseUrl,
      onOrgName: () => options.orgName || null,
      onAccessToken: () => options.accessToken || null,
    });

    const developerRequester = new DeveloperRequester(adaptor);
    const file = await readFile(filepath);
    const codebase = new Blob([file]);

    const formData = this.convertJsonToFormData(codebase);
    await developerRequester.updateCodebase(formData, {
      'content-type': 'multipart/form-data',
    });
  }

  private convertJsonToFormData(codebase: Blob): FormData {
    const formData = new FormData();
    formData.append('file', codebase, 'application.json');
    return formData;
  }
}
