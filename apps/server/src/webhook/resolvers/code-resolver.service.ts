import { Inject, Injectable } from '@nestjs/common';
import { IDString, SourceServiceCreateDto } from '../../app.type';
import { SourceService } from '../../source/source.service';
import { QueryParserOptions } from '../../util/query/interfaces';
import { NodeVM } from 'vm2';

import { TaskFailed } from '../../util/workflow/errors/TaskFailed';
import { InputOrOutput } from '../../util/workflow/types';

import { CodeResolver } from '@shukun/code-resolver';
import { Resolver } from './resolver.interface';

@Injectable()
export class CodeResolverService implements Resolver {
  // TODO: mount LoggerService Module
  // @Inject()
  // private readonly loggerService!: LoggerService

  @Inject()
  private readonly sourceService!: SourceService<any>;

  validateParameters() {
    return true;
  }

  async run(
    resourceMethod: string,
    parameters: InputOrOutput,
    orgName: string,
    operatorId?: IDString,
  ): Promise<any> {
    if (!parameters) {
      throw new TaskFailed('Should set parameters.');
    }

    const { code } = parameters;

    if (!code || typeof code !== 'string') {
      throw new TaskFailed('Should specify code in parameters.');
    }

    const vm = new NodeVM();
    let output;

    // eslint-disable-next-line no-useless-catch
    try {
      const exports = vm.run(code);
      output = await exports.default(
        this.createScope(orgName, operatorId),
        parameters,
      );
    } catch (error) {
      // this.loggerService.error(error);
      throw error;
    }

    return {
      value: output,
    };
  }

  createScope(orgName: string, operatorId?: IDString) {
    const scope: CodeResolver = {
      source: {
        findAll: async (atomName: string, query: QueryParserOptions) => {
          return await this.sourceService.findAll(orgName, atomName, query);
        },

        findOne: async (atomName: string, query: QueryParserOptions) => {
          return await this.sourceService.findOne(orgName, atomName, query);
        },

        createOne: async (atomName: string, data: SourceServiceCreateDto) => {
          const entity = await this.sourceService.createOne(
            orgName,
            atomName,
            data,
            operatorId || null,
          );
          return {
            _id: entity._id,
          };
        },

        updateOne: async (
          id: IDString,
          atomName: string,
          data: SourceServiceCreateDto,
        ) => {
          return await this.sourceService.updateOne(
            id,
            orgName,
            atomName,
            data,
          );
        },

        deleteOne: async (id: IDString, atomName: string) => {
          return await this.sourceService.deleteOne(id, orgName, atomName);
        },

        count: async (atomName: string, query: QueryParserOptions) => {
          return await this.sourceService.count(orgName, atomName, query);
        },

        addToMany: async (
          id: IDString,
          atomName: string,
          electronName: string,
          foreignId: string,
        ) => {
          await this.sourceService.addToMany(
            id,
            orgName,
            atomName,
            electronName,
            foreignId,
          );
        },

        removeFromMany: async (
          id: IDString,
          atomName: string,
          electronName: string,
          foreignId: string,
        ) => {
          await this.sourceService.addToMany(
            id,
            orgName,
            atomName,
            electronName,
            foreignId,
          );
        },

        increase: async (
          id: IDString,
          atomName: string,
          electronName: string,
          increment: number,
        ) => {
          await this.sourceService.increase(
            id,
            orgName,
            atomName,
            electronName,
            increment,
          );
        },

        decrease: async (
          id: IDString,
          atomName: string,
          electronName: string,
          increment: number,
        ) => {
          await this.sourceService.increase(
            id,
            orgName,
            atomName,
            electronName,
            increment * -1,
          );
        },
      },
    };

    return scope;
  }
}
