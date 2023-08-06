import {
  ITemplateService,
  TemplateBasicOutput,
  TemplateEvaluateHelpers,
  TemplateEvaluateStates,
} from '@shukun/presenter/definition';

import { parseParameters } from './template';

export class TemplateService implements ITemplateService {
  run(
    template: unknown,
    states: TemplateEvaluateStates,
    helpers: TemplateEvaluateHelpers,
  ): TemplateBasicOutput {
    return parseParameters(template, { states, helpers });
  }
}
