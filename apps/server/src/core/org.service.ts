import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApplicationSchema } from '@shukun/schema';
import { Model } from 'mongoose';

import { DB_DEFAULT_LIMIT, DB_DEFAULT_SKIP } from '../app.constant';
import { IDString } from '../app.type';
import { QueryParserOptions } from '../util/query/interfaces';

import { OrgDocument, OrgDocumentName } from './org/org.schema';
import { CreateDto } from './org/org.types';

@Injectable()
export class OrgService {
  @InjectModel(OrgDocumentName)
  private readonly orgModel: Model<OrgDocument>;

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
      .skip(query.skip || DB_DEFAULT_SKIP)
      .limit(query.limit || DB_DEFAULT_LIMIT)
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

  async updateCodebase(orgId: IDString, codebase: ApplicationSchema) {
    const buffer = Buffer.from(JSON.stringify(codebase));

    await this.orgModel.updateOne(
      { _id: orgId },
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
}
