import { Inject, Injectable } from '@nestjs/common';
import { FlowSchema } from '@shukun/schema';

import { CompiledCodeService } from './compiled-code.service';
import { DefinitionService } from './definition.service';
import { ResolverContext } from './interface';
import { ResolverService } from './resolver.service';

@Injectable()
export class FlowService {
  constructor(
    @Inject() private readonly definitionService: DefinitionService,
    @Inject() private readonly compiledCodeService: CompiledCodeService,
    @Inject() private readonly resolverService: ResolverService,
  ) {}

  async execute(orgName: string, flowName: string, input: unknown) {
    const definition = await this.getDefinition(orgName, flowName);
    const compiledCodes = await this.getCompiledCodes(orgName, flowName);

    this.validateInputs(input, definition.input);

    const { output } = await this.resolverService.executeEvent(
      definition.events,
      input,
      this.prepareContext(definition, compiledCodes),
    );

    this.validateOutputs(output, definition.output);

    return output;
  }

  async getDefinition(orgName: string, flowName: string) {
    return await this.definitionService.getDefinition(orgName, flowName);
  }

  async getCompiledCodes(orgName: string, flowName: string) {
    return await this.compiledCodeService.getCompiledCodes(orgName, flowName);
  }

  prepareContext(
    definition: FlowSchema,
    compiledCodes: Record<string, string>,
  ): ResolverContext {
    return {
      index: 0,
      store: {},
      environment: {},
      compiledCodes,
      eventName: definition.startEventName,
      parentEventNames: undefined,
    };
  }

  validateInputs(input: unknown, jsonSchemaRule: FlowSchema['input']) {
    // TODO: implement this method
  }

  validateOutputs(output: unknown, jsonSchemaRule: FlowSchema['output']) {
    // TODO: implement this method
  }
}
