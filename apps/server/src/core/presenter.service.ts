import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SourceNotFoundException, TypeException } from '@shukun/exception';
import { PresenterSchema } from '@shukun/schema';
import { Model } from 'mongoose';

import { OrgService } from './org.service';
import {
  PresenterDocument,
  PresenterDocumentName,
} from './presenter/presenter.schema';
import { CreateDto } from './presenter/presenter.types';

export type PresenterEntity = {
  name: string;
  orgName: string;
  definition: PresenterSchema;
};

@Injectable()
export class PresenterService {
  @InjectModel(PresenterDocumentName)
  private readonly presenterModel!: Model<PresenterDocument>;

  // TODO should remove orgService when removing old presenter save
  constructor(
    /**
     * @deprecated
     */
    private readonly orgService: OrgService,
  ) {}

  private async checkExist(orgName: string, presenterName: string) {
    try {
      await this.findOne(orgName, presenterName);
    } catch {
      return false;
    }
    throw new TypeException('The presenterName is exist: {{presenterName}}', {
      presenterName,
    });
  }

  async createOne(createDto: CreateDto): Promise<{ _id: string }> {
    await this.checkExist(createDto.orgName, createDto.name);

    const emptyPresenterDefinition: PresenterSchema = {
      label: createDto.name,
      widgets: {
        root: {
          tag: 'root',
          label: 'root',
          properties: {},
          events: {},
        },
      },
      nodes: {
        root: [],
      },
      repositories: {},
    };
    const entity = new this.presenterModel({
      ...createDto,
      definition: JSON.stringify(emptyPresenterDefinition),
    });
    const value = await entity.save();
    return { _id: value._id };
  }

  async updateOne(
    orgName: string,
    presenterName: string,
    presenter: PresenterSchema,
  ): Promise<void> {
    const buffer = Buffer.from(JSON.stringify(presenter));
    await this.presenterModel.updateOne(
      {
        name: presenterName,
        orgName,
      },
      {
        definition: buffer,
      },
    );
  }

  async deleteOne(orgName: string, presenterName: string): Promise<void> {
    await this.presenterModel.deleteOne({ name: presenterName, orgName });
  }

  async findOne(
    orgName: string,
    presenterName: string,
  ): Promise<PresenterSchema> {
    const presenter = await this.presenterModel.findOne({
      orgName,
      name: presenterName,
    });

    if (!presenter) {
      throw new SourceNotFoundException(
        'Did not find specific presenter: {{presenterName}}',
        {
          presenterName,
        },
      );
    }

    const definition: PresenterSchema = JSON.parse(
      presenter.definition.toString(),
    );

    return definition;
  }

  async findMany(orgName: string): Promise<Record<string, PresenterSchema>> {
    const presenters = await this.presenterModel.find({
      orgName,
    });

    const presenterSchemas: Record<string, PresenterSchema> = {};

    presenters.map((presenter) => {
      presenterSchemas[presenter.name] = JSON.parse(
        presenter.definition.toString(),
      );
    });

    return presenterSchemas;
  }

  /**
   * @deprecated
   */
  async update(
    orgName: string,
    presenters: Record<string, PresenterSchema>,
  ): Promise<void> {
    await this.orgService.updatePresenters(orgName, presenters);
  }
}
