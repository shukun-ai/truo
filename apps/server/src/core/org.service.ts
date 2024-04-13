import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeException } from '@shukun/exception';
import {
  ApplicationSchema,
  DataSourceSchema,
  IDString,
  MetadataSchema,
  PresenterSchema,
} from '@shukun/schema';

import { DB_DEFAULT_LIMIT, DB_DEFAULT_SKIP } from '../app.constant';
import { QueryParserOptions } from '../util/query/interfaces';

import { MongoConnectionService } from './mongo-connection.service';
import { IOrg } from './org/org.schema';
import { CreateDto } from './org/org.types';

@Injectable()
export class OrgService {
  constructor(
    private readonly mongoConnectionService: MongoConnectionService,
  ) {}

  async findOrgId(orgName: string): Promise<IDString> {
    const org = await this.mongoConnectionService.orgModel
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

  async findAll(query: QueryParserOptions): Promise<IOrg[]> {
    const value = await this.mongoConnectionService.orgModel
      .find(query.filter)
      .select(query.select)
      .populate(query.populate)
      .skip(query.skip ?? DB_DEFAULT_SKIP)
      .limit(query.limit ?? DB_DEFAULT_LIMIT)
      .sort(query.sort)
      .exec();
    return value;
  }

  async findOne(query: QueryParserOptions): Promise<IOrg> {
    const value = await this.mongoConnectionService.orgModel
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
    const value = await this.mongoConnectionService.orgModel
      .find(query.filter)
      .select(query.select)
      .countDocuments()
      .exec();
    return value;
  }

  async createOne(createDto: CreateDto): Promise<IOrg> {
    const entity = new this.mongoConnectionService.orgModel(createDto);
    const value = await entity.save();
    return value;
  }

  async deleteOne(orgName: string): Promise<null> {
    await this.mongoConnectionService.orgModel.deleteOne({ name: orgName });
    return null;
  }

  async updateCodebase(orgName: string, codebase: ApplicationSchema) {
    const buffer = Buffer.from(JSON.stringify(codebase));

    await this.mongoConnectionService.orgModel.updateOne(
      { name: orgName },
      {
        codebase: buffer,
      },
    );
  }

  async findCodebaseByOrgName(orgName: string): Promise<ApplicationSchema> {
    const org = await this.mongoConnectionService.orgModel
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

  async updateDataSource(orgName: IDString, dataSource: DataSourceSchema) {
    await this.mongoConnectionService.orgModel.updateOne(
      { name: orgName },
      {
        dataSource,
      },
    );
  }

  async findDataSource(orgName: string): Promise<DataSourceSchema> {
    const org = await this.mongoConnectionService.orgModel
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
    const org = await this.mongoConnectionService.orgModel
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

    await this.mongoConnectionService.orgModel.updateOne(
      { name: orgName },
      {
        migrated: buffer,
      },
    );
  }

  async updatePresenters(
    orgName: IDString,
    presenters: Record<string, PresenterSchema>,
  ) {
    const buffer = Buffer.from(JSON.stringify(presenters));

    await this.mongoConnectionService.orgModel.updateOne(
      { name: orgName },
      {
        presenters: buffer,
      },
    );
  }

  async findPresenters(
    orgName: string,
  ): Promise<Record<string, PresenterSchema>> {
    const org = await this.mongoConnectionService.orgModel
      .findOne({ name: orgName })
      .select('presenters')
      .exec();

    if (!org?.presenters) {
      return {};
    }

    const presenters: Record<string, PresenterSchema> = JSON.parse(
      org.presenters.toString(),
    );
    return presenters;
  }

  async getDatabase(orgName: string): Promise<string> {
    const org = await this.mongoConnectionService.orgModel
      .findOne({ name: orgName })
      .select('database')
      .exec();

    if (!org?.database) {
      throw new TypeException('Did not configure database for org: {{org}}', {
        org: orgName,
      });
    }

    return org.database;
  }
}
