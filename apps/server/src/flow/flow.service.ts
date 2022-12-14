import { Injectable } from '@nestjs/common';
import { FlowEventCompiledCodes, FlowSchema } from '@shukun/schema';

import { ObservableStore } from '../sandbox/stores/observable-store.class';

import { CompiledCodeService } from './compiled-code.service';
import { DefinitionService } from './definition.service';
import { ExternalContext, ResolverContext } from './flow.interface';
import { ResolverService } from './resolver.service';

@Injectable()
export class FlowService {
  constructor(
    private readonly definitionService: DefinitionService,
    private readonly compiledCodeService: CompiledCodeService,
    private readonly resolverService: ResolverService,
  ) {}

  async execute(
    orgName: string,
    flowName: string,
    input: unknown,
    externalContext: ExternalContext,
  ) {
    const definition = await this.getDefinition(orgName, flowName);
    const compiledCodes = await this.getCompiledCodes(orgName, flowName);
    const parameter = input;

    this.validateInputs(input, definition.input);

    const context = this.prepareContext(
      definition,
      compiledCodes,
      externalContext,
      parameter,
    );

    const { output } = await this.resolverService.executeEvent(
      definition.events,
      context,
    );

    this.validateOutputs(output, definition.output);

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

  createStore() {
    const store = new ObservableStore();
    return store;
  }

  prepareContext(
    definition: FlowSchema,
    compiledCodes: FlowEventCompiledCodes,
    externalContext: ExternalContext,
    parameter: unknown,
  ): ResolverContext {
    const store = this.createStore();

    return {
      index: 0,
      input: parameter,
      store,
      environment: {},
      compiledCodes,
      eventName: definition.startEventName,
      parentEventNames: undefined,
      orgName: externalContext.orgName,
      operatorId: externalContext.operatorId,
    };
  }

  validateInputs(input: unknown, jsonSchemaRule: FlowSchema['input']) {
    // TODO: implement this method
  }

  validateOutputs(output: unknown, jsonSchemaRule: FlowSchema['output']) {
    // TODO: implement this method
  }
}
