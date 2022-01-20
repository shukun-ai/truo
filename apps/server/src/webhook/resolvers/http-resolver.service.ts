import axios from 'axios';

import { TaskFailed } from '../../util/workflow/errors/TaskFailed';
import { InputOrOutput } from '../../util/workflow/types';

import { Resolver } from './resolver.interface';

export class HttpResolverService implements Resolver {
  validateParameters() {
    return true;
  }

  async run(resourceMethod: string, parameters: InputOrOutput): Promise<any> {
    if (!parameters) {
      throw new TaskFailed('Should set parameters.');
    }

    const { url, method, headers, query, data } = parameters;

    if (!url || typeof url !== 'string') {
      throw new TaskFailed('Should specify url in parameters.');
    }

    if (
      !url ||
      typeof url !== 'string' ||
      !['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method)
    ) {
      throw new TaskFailed('Should specify method in parameters.');
    }

    try {
      const response = await axios({
        method,
        url,
        headers,
        params: query,
        data,
        timeout: 30000, // @todo should be pass by state.
      });

      return {
        data: response?.data,
        headers: response?.headers,
        status: response?.status,
        config: response?.config,
      };
    } catch (error) {
      throw error;
    }
  }
}
