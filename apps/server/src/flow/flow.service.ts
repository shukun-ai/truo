import { BadRequestException, Injectable } from '@nestjs/common';
import {
  createBaseAjv,
  DataSourceEnvironments,
  FlowSchema,
  stringifyValidateErrors,
} from '@shukun/schema';

import { EnvironmentService } from '../core/environment.service';

import { SandboxContext } from '../sandbox/sandbox.interface';

import { CompiledCodeService } from './compiled-code.service';
import { DefinitionService } from './definition.service';
import { ExternalContext } from './flow.interface';
import { ResolverService } from './resolver.service';

@Injectable()
export class FlowService {
  constructor(
    private readonly definitionService: DefinitionService,
    private readonly compiledCodeService: CompiledCodeService,
    private readonly resolverService: ResolverService,
    private readonly environmentService: EnvironmentService,
  ) {}

  async execute(
    orgName: string,
    flowName: string,
    input: unknown,
    externalContext: ExternalContext,
  ) {
    const definition = await this.getDefinition(orgName, flowName);
    const compiledCodes = await this.getCompiledCodes(orgName, flowName);
    const environments = await this.environmentService.findAllEnvironments(
      orgName,
    );

    this.validateInputOrOutput(input, definition.input);

    const context = this.prepareContext(
      input,
      environments,
      definition,
      externalContext,
    );

    const { input: output } = await this.resolverService.executeNextEvent(
      definition.events,
      compiledCodes,
      context,
    );

    this.validateInputOrOutput(output, definition.output);

    return output;
  }

  async getDefinition(orgName: string, flowName: string) {
    return await this.definitionService.getDefinition(orgName, flowName);
  }

  async getCompiledCodes(orgName: string, flowName: string) {
    return await this.compiledCodeService.getEventCompiledCodes(
      orgName,
      flowName,
    );
  }

  prepareContext(
    input: unknown,
    environments: DataSourceEnvironments,
    definition: FlowSchema,
    externalContext: ExternalContext,
  ): SandboxContext {
    return {
      input,
      next: definition.startEventName,
      index: 0,
      env: environments,
      store: {},
      orgName: externalContext.orgName,
      operatorId: externalContext.operatorId,
    };
  }

  validateInputOrOutput(
    inputOrOutput: unknown,
    jsonSchema: FlowSchema['input'] | FlowSchema['output'],
  ): void {
    const validate = createBaseAjv().compile(jsonSchema);
    const result = validate(inputOrOutput);

    if (!result) {
      throw new BadRequestException(stringifyValidateErrors(validate));
    }
  }
}
