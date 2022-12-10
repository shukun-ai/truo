import { Inject, Injectable } from '@nestjs/common';
import { HttpQuerySchema, QueryFilter } from '@shukun/schema';

import { SourceService } from '../../source/source.service';

@Injectable()
export class SourceForeignQueryService {
  @Inject()
  private readonly sourceService!: SourceService<unknown>;

  async prepareForeignQuery(
    orgName: string,
    atomName: string,
    filter: QueryFilter,
  ) {
    const newFilter: QueryFilter = {};

    for (const [key, value] of Object.entries(filter)) {
      if (typeof value === 'object' && value['$foreign']) {
        newFilter[key] = await this.prepareForeignIds(
          orgName,
          atomName,
          key,
          value['$foreign'],
        );
      } else {
        newFilter[key] = value;
      }
    }

    return newFilter;
  }

  async prepareForeignIds(
    orgName: string,
    atomName: string,
    electronName: string,
    filter: QueryFilter,
  ) {
    const query: HttpQuerySchema = {
      filter,
      select: {
        _id: true,
      },
    };

    const foreignAtomName = await this.getForeignAtomName(
      orgName,
      atomName,
      electronName,
    );

    const entities = await this.queryForeign(orgName, foreignAtomName, query);

    const ids = entities.map((item) => item._id);

    return {
      $in: ids,
    };
  }

  async queryForeign(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
  ) {
    query.filter = await this.prepareForeignQuery(
      orgName,
      atomName,
      query.filter ?? {},
    );

    const entities = await this.sourceService.findAll(orgName, atomName, query);

    return entities;
  }

  async getForeignAtomName(
    orgName: string,
    atomName: string,
    electronName: string,
  ): Promise<string> {
    const metadata = await this.sourceService.getMetadata(orgName, atomName);

    const electron = metadata.electrons.find(
      (electron) => electron.name === electronName,
    );

    if (!electron) {
      throw new Error(
        `Did not find specific electron in getForeignAtomName: ${electronName}`,
      );
    }

    if (!electron.referenceTo) {
      throw new Error(
        `Did not find specific referenceTo in getForeignAtomName: ${electronName}`,
      );
    }

    return electron.referenceTo;
  }
}
