import { BadRequestException, Injectable } from '@nestjs/common';
import { IDString, MetadataElectron, MetadataSchema } from '@shukun/schema';
import { Schema, Document, Model as MongooseModel, Connection } from 'mongoose';

import { OrgService } from '../../core/org.service';

import {
  MongooseSchema,
  MongooseConstraintSchema,
} from '../electron/electron-field.interface';
import { getFieldInstance } from '../electron/fields-map';

import { MongoConnectionService } from './mongo-connection.service';

@Injectable()
export class MongooseConnectionService {
  constructor(
    private readonly orgService: OrgService,
    private readonly mongoConnectionService: MongoConnectionService,
  ) {}

  async getAtomModel<Model>(
    orgName: string,
    metadata: MetadataSchema,
  ): Promise<MongooseModel<Model & Document>> {
    return await this.createAtomModel(orgName, metadata);
  }

  async createAtomModel<Model>(
    orgName: string,
    metadata: MetadataSchema,
  ): Promise<MongooseModel<Model & Document>> {
    const orgId = await this.orgService.findOrgId(orgName);

    const schemaName = this.buildSchemaName(orgId, metadata);

    const connection = await this.mongoConnectionService.getConnection(orgName);

    const schema = await this.buildAtomSchema(metadata, connection);

    const ModelClass = connection.model<Model & Document>(
      schemaName,
      schema,
      schemaName,
    );

    return ModelClass;
  }

  protected async buildAtomSchema(
    metadata: MetadataSchema,
    connection: Connection,
  ): Promise<Schema> {
    const atomSchema: Record<
      string,
      MongooseSchema & MongooseConstraintSchema
    > = {};

    if (metadata.electrons.length < 1) {
      throw new BadRequestException('模型没有生成，或者不存在已生成的字段。');
    }

    for (const electron of metadata.electrons) {
      atomSchema[electron.name] = this.buildElectronSchema(
        electron,
        connection,
      );
    }

    atomSchema.owner = this.buildOwnerSchema();

    return new Schema(atomSchema, { timestamps: true });
  }

  protected buildElectronSchema(
    electron: MetadataElectron,
    connection: Connection,
  ): MongooseSchema & MongooseConstraintSchema {
    const field = getFieldInstance(electron);
    const fieldSchema = field.buildSchema(connection);

    return {
      ...fieldSchema,
      index: electron.isIndexed || electron.isUnique || false,
      required: electron.isRequired || false,
      unique: electron.isUnique || false,
    };
  }

  private buildSchemaName(orgId: IDString, metadata: MetadataSchema): string {
    if (orgId.length !== 24) {
      throw new BadRequestException('The length of orgId should be 24.');
    }

    return `org_${orgId}_${metadata.name}`;
  }

  private buildOwnerSchema(): MongooseSchema & MongooseConstraintSchema {
    return {
      type: Schema.Types.ObjectId,
      index: false,
      required: false,
      unique: false,
    };
  }
}
