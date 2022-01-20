import { Inject } from '@nestjs/common';
import { IDString } from '../../app.type';

import { SourceService } from '../../source/source.service';
import { TaskFailed } from '../../util/workflow/errors/TaskFailed';
import { InputOrOutput } from '../../util/workflow/types';

import { Resolver } from './resolver.interface';

export class SourceResolverService implements Resolver {
  @Inject() private readonly sourceService: SourceService<any>;

  validateParameters() {
    return true;
  }

  async run(
    resourceMethod: string,
    parameters: InputOrOutput,
    orgName: string,
    operatorId?: string,
  ): Promise<any> {
    if (!resourceMethod || !parameters || !orgName) {
      throw new TaskFailed();
    }

    switch (resourceMethod) {
      case 'createOne':
        return await this.executeCreateOne(parameters, orgName, operatorId);
      case 'updateOne':
        return await this.executeUpdateOne(parameters, orgName);
      case 'findOne':
        return await this.executeFindOne(parameters, orgName);
      case 'findAll':
        return await this.executeFindAll(parameters, orgName);
      case 'count':
        return await this.executeCount(parameters, orgName);
      case 'deleteOne':
        return await this.executeDeleteOne(parameters, orgName);
      case 'addToMany':
        return await this.executeAddToMany(parameters, orgName);
      case 'removeFromMany':
        return await this.executeRemoveFromMany(parameters, orgName);
      case 'increase':
        return await this.executeIncrease(parameters, orgName);
      case 'decrease':
        return await this.executeDecrease(parameters, orgName);
      default:
        throw new Error('We did not find the specific resource name.');
    }
  }

  async executeCreateOne(
    args: InputOrOutput,
    orgName: string,
    operatorId?: string,
  ) {
    const { atomName, data } = args;
    const entity = await this.sourceService.createOne(
      orgName,
      atomName,
      data,
      operatorId || null,
    );
    return {
      _id: entity._id,
    };
  }

  async executeUpdateOne(args: InputOrOutput, orgName: string) {
    const { id, atomName, data } = args;
    await this.sourceService.updateOne(id, orgName, atomName, data);
    return null;
  }

  async executeFindOne(args: InputOrOutput, orgName: string) {
    const { atomName, query } = args;
    return await this.sourceService.findOne(orgName, atomName, query);
  }

  async executeFindAll(args: InputOrOutput, orgName: string) {
    const { atomName, query } = args;
    return await this.sourceService.findAll(orgName, atomName, query);
  }

  async executeCount(args: InputOrOutput, orgName: string) {
    const { atomName, query } = args;
    return await this.sourceService.count(orgName, atomName, query);
  }

  async executeDeleteOne(args: InputOrOutput, orgName: string) {
    const { atomName, query } = args;
    return await this.sourceService.deleteOne(orgName, atomName, query);
  }

  async executeAddToMany(args: InputOrOutput, orgName: string) {
    const { id, atomName, electronName, foreignId } = args;
    await this.sourceService.addToMany(
      id,
      orgName,
      atomName,
      electronName,
      foreignId,
    );
    return null;
  }

  async executeRemoveFromMany(args: InputOrOutput, orgName: string) {
    const { id, atomName, electronName, foreignId } = args;
    await this.sourceService.addToMany(
      id,
      orgName,
      atomName,
      electronName,
      foreignId,
    );
    return null;
  }

  async executeIncrease(args: InputOrOutput, orgName: string) {
    const { id, atomName, electronName, increment } = args as {
      id: IDString;
      atomName: string;
      electronName: string;
      increment: number;
    };
    await this.sourceService.increase(
      id,
      orgName,
      atomName,
      electronName,
      increment,
    );
    return null;
  }

  async executeDecrease(args: InputOrOutput, orgName: string) {
    return this.executeIncrease(
      { ...args, increment: args.increment * -1 },
      orgName,
    );
  }
}
