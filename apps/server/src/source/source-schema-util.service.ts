import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  MetadataElectron,
  MetadataFieldType,
  MetadataSchema,
} from '@shukun/schema';
import { Connection, Schema, Document, Model as MongooseModel } from 'mongoose';

import { IDString, SourceServiceCreateDto } from '../app.type';
import { OrgService } from '../core/org.service';

import {
  SchemaBuilderResult,
  SchemaCommonResult,
} from './electron/electron-field.interface';
import { getFieldInstance } from './electron/fields-map';

@Injectable()
export class SourceSchemaUtilService {
  @InjectConnection()
  private readonly connection!: Connection;

  @Inject()
  private readonly orgService!: OrgService;

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
    const atomSchema: Record<string, SchemaBuilderResult & SchemaCommonResult> =
      {};

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
  ): Promise<SchemaBuilderResult & SchemaCommonResult> {
    const field = getFieldInstance(electron.fieldType);
    const fieldSchema = field.buildSchema(electron, this.connection);

    return {
      ...fieldSchema,
      index: electron.isIndexed || electron.isUnique || false,
      required: electron.isRequired || false,
      unique: electron.isUnique || false,
    };
  }

  buildParams(
    metadata: MetadataSchema,
    dto: SourceServiceCreateDto,
  ): SourceServiceCreateDto {
    const sets: SourceServiceCreateDto = {};
    let errorMessage: string[] = [];

    for (const key in dto) {
      if (Object.prototype.hasOwnProperty.call(dto, key)) {
        const value = dto[key];

        const electron = metadata.electrons.find(
          (electron) => electron.name === key,
        );

        if (electron) {
          const field = getFieldInstance(
            electron.fieldType as MetadataFieldType,
          );
          const result = field.validateValue(value, electron);

          const newMessage = result.map((message) => `${key} ${message}`);

          errorMessage = [...errorMessage, ...newMessage];

          const parsedValue = field.beforeSave
            ? field.beforeSave(value, electron)
            : value;

          sets[key] = parsedValue;
        }
      }
    }

    if (errorMessage.length > 0) {
      throw new BadRequestException(errorMessage);
    }

    return sets;
  }

  private buildSchemaName(orgId: IDString, metadata: MetadataSchema): string {
    if (orgId.length !== 24) {
      throw new BadRequestException('The length of orgId should be 24.');
    }

    return `org_${orgId}_${metadata.name}`;
  }
}
