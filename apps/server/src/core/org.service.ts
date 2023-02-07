import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ApplicationSchema,
  FlowOrgCompiledCodes,
  DataSourceSchema,
  IDString,
  MetadataSchema,
} from '@shukun/schema';
import { Model } from 'mongoose';

import { DB_DEFAULT_LIMIT, DB_DEFAULT_SKIP } from '../app.constant';
import { QueryParserOptions } from '../util/query/interfaces';

import { OrgDocument, OrgDocumentName } from './org/org.schema';
import { CreateDto } from './org/org.types';

@Injectable()
export class OrgService {
  @InjectModel(OrgDocumentName)
  private readonly orgModel!: Model<OrgDocument>;

  async findOrgId(orgName: string): Promise<IDString> {
    const org = await this.orgModel
      .findOne({ name: orgName })
      .select({ _id: 1 })
      .exec();
    if (!org) {
      throw new BadRequestException(
        `通过组织名（${orgName}）找不到对应的组织。`,
      );
    }

    return org._id.toString();
  }

  async findAll(query: QueryParserOptions): Promise<OrgDocument[]> {
    const value = await this.orgModel
      .find(query.filter)
      .select(query.select)
      .populate(query.populate)
      .skip(query.skip ?? DB_DEFAULT_SKIP)
      .limit(query.limit ?? DB_DEFAULT_LIMIT)
      .sort(query.sort)
      .exec();
    return value;
  }

  async findOne(query: QueryParserOptions): Promise<OrgDocument> {
    const value = await this.orgModel
      .findOne(query.filter)
      .select(query.select)
      .populate(query.populate)
      .sort(query.sort)
      .exec();

    if (!value) {
      throw new BadRequestException('根据查询条件未找到符合的组织');
    }

    return value;
  }

  async count(query: QueryParserOptions): Promise<number> {
    const value = await this.orgModel
      .find(query.filter)
      .select(query.select)
      .countDocuments()
      .exec();
    return value;
  }

  async createOne(createDto: CreateDto): Promise<OrgDocument> {
    const entity = new this.orgModel(createDto);
    const value = await entity.save();
    return value;
  }

  async deleteOne(orgName: string): Promise<null> {
    await this.orgModel.deleteOne({ name: orgName });
    return null;
  }

  async updateCodebase(orgName: string, codebase: ApplicationSchema) {
    const buffer = Buffer.from(JSON.stringify(codebase));

    await this.orgModel.updateOne(
      { name: orgName },
      {
        codebase: buffer,
      },
    );
  }

  async findCodebaseByOrgName(orgName: string): Promise<ApplicationSchema> {
    const org = await this.orgModel
      .findOne({ name: orgName })
      .select('codebase')
      .exec();

    if (!org?.codebase) {
      const application: ApplicationSchema = {
        title: 'No title',
      };
      return application;
    }

    const application: ApplicationSchema = JSON.parse(org.codebase.toString());
    return application;
  }

  async findCodebase(orgId: IDString): Promise<ApplicationSchema> {
    const org = await this.orgModel
      .findOne({ _id: orgId })
      .select('codebase')
      .exec();

    if (!org?.codebase) {
      const application: ApplicationSchema = {
        title: 'No title',
      };
      return application;
    }

    const application: ApplicationSchema = JSON.parse(org.codebase.toString());
    return application;
  }

  async updateFlowOrgCompiledCodes(
    orgName: IDString,
    flowOrgCompiledCodes: FlowOrgCompiledCodes,
  ) {
    const buffer = Buffer.from(JSON.stringify(flowOrgCompiledCodes));

    await this.orgModel.updateOne(
      { name: orgName },
      {
        compiledCodes: buffer,
      },
    );
  }

  async findFlowOrgCompiledCodesByOrgName(
    orgName: string,
  ): Promise<FlowOrgCompiledCodes> {
    const org = await this.orgModel
      .findOne({ name: orgName })
      .select('compiledCodes')
      .exec();

    if (!org?.compiledCodes) {
      const flowCompiledCodes: FlowOrgCompiledCodes = {};
      return flowCompiledCodes;
    }

    const flowCompiledCodes: FlowOrgCompiledCodes = JSON.parse(
      org.compiledCodes.toString(),
    );
    return flowCompiledCodes;
  }

  async updateDataSource(orgName: IDString, dataSource: DataSourceSchema) {
    await this.orgModel.updateOne(
      { name: orgName },
      {
        dataSource,
      },
    );
  }

  async findDataSource(orgName: string): Promise<DataSourceSchema> {
    const org = await this.orgModel
      .findOne({ name: orgName })
      .select('dataSource')
      .exec();

    if (!org?.dataSource) {
      const dataSource: DataSourceSchema = {
        connections: {},
      };
      return dataSource;
    }

    return org.dataSource;
  }

  async findMigrated(orgName: string): Promise<MetadataSchema[]> {
    const org = await this.orgModel
      .findOne({ name: orgName })
      .select('migrated')
      .exec();

    if (!org?.migrated) {
      return [];
    }

    return JSON.parse(org.migrated.toString());
  }

  async updateMigrated(
    orgName: string,
    metadata: MetadataSchema[],
  ): Promise<void> {
    const buffer = Buffer.from(JSON.stringify(metadata));

    await this.orgModel.updateOne(
      { name: orgName },
      {
        migrated: buffer,
      },
    );
  }
}
