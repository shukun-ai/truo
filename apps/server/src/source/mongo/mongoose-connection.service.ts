import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { getElectronInstance, MongooseSchema } from '@shukun/electron';
import { MetadataElectron, MetadataSchema } from '@shukun/schema';
import { Connection, Schema, Document, Model as MongooseModel } from 'mongoose';

import { IDString } from '../../app.type';
import { OrgService } from '../../core/org.service';

import { SchemaCommonResult } from '../electron/electron-field.interface';

@Injectable()
export class MongooseConnectionService {
  constructor(
    private readonly orgService: OrgService,
    @InjectConnection() private readonly connection: Connection,
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

    const schema = await this.buildAtomSchema(metadata);

    const ModelClass = this.connection.model<Model & Document>(
      schemaName,
      schema,
      schemaName,
    );

    return ModelClass;
  }

  protected async buildAtomSchema(metadata: MetadataSchema): Promise<Schema> {
    const atomSchema: Record<string, MongooseSchema & SchemaCommonResult> = {};

    if (metadata.electrons.length < 1) {
      throw new BadRequestException('模型没有生成，或者不存在已生成的字段。');
    }

    for (const electron of metadata.electrons) {
      atomSchema[electron.name] = await this.buildElectronSchema(electron);
    }

    return new Schema(atomSchema, { timestamps: true });
  }

  protected async buildElectronSchema(
    electron: MetadataElectron,
  ): Promise<MongooseSchema & SchemaCommonResult> {
    const field = getElectronInstance(electron.fieldType);
    const fieldSchema = field.buildMongooseSchema(electron, this.connection);

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
}
