import { BadRequestException } from '@nestjs/common';

import { EnvironmentService } from '../core/environment.service';
import { mockEmptyDependencies } from '../util/unit-testing/unit-testing.helper';

import { CompiledCodeService } from './compiled-code.service';
import { DefinitionService } from './definition.service';
import { FlowService } from './flow.service';
import { ResolverService } from './resolver.service';

describe('FlowService', () => {
  let flowService: FlowService;
  let definitionService: DefinitionService;
  let compiledCodeService: CompiledCodeService;
  let resolverService: ResolverService;
  let environmentService: EnvironmentService;

  beforeAll(() => {
    definitionService = new DefinitionService(mockEmptyDependencies());
    compiledCodeService = new CompiledCodeService(mockEmptyDependencies());
    resolverService = new ResolverService(mockEmptyDependencies());
    environmentService = new EnvironmentService(
      mockEmptyDependencies(),
      mockEmptyDependencies(),
    );

    flowService = new FlowService(
      definitionService,
      compiledCodeService,
      resolverService,
      environmentService,
    );
  });

  describe('validateInputOrOutput', () => {
    it('should pass, when value is match with jsonSchema.', () => {
      const value = {
        name: 'Hello World!',
      };
      const jsonSchema = {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
        },
      };
      const output = flowService.validateInputOrOutput(value, jsonSchema);
      expect(output).toEqual(undefined);
    });

    it('should throw error, when value is not match with jsonSchema.', () => {
      const value = {
        count: 9,
      };
      const jsonSchema = {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
        },
      };
      expect(() =>
        flowService.validateInputOrOutput(value, jsonSchema),
      ).toThrow(
        new BadRequestException(
          `Schema Validate Errors: [{"instancePath":"","schemaPath":"#/required","keyword":"required","params":{"missingProperty":"name"},"message":"must have required property 'name'"}]`,
        ),
      );
    });

    it('should pass, when the jsonSchema is a empty object.', () => {
      const value = null;
      const jsonSchema = {};
      const output = flowService.validateInputOrOutput(value, jsonSchema);
      expect(output).toEqual(undefined);
    });
  });
});
