import { Injectable } from '@nestjs/common';
import { HttpQuerySchema, QueryFilter } from '@shukun/schema';

import { DB_UNLIMITED_QUERY } from '../app.constant';

import { SourceFoundationService } from './source-foundation.service';

@Injectable()
export class SourceForeignQueryService<Model> {
  constructor(
    private readonly sourceFoundationService: SourceFoundationService<Model>,
  ) {}

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
      limit: DB_UNLIMITED_QUERY, // TODO should write integrated testing for this limit when the searched data is greater than 1000.
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

    const entities = await this.sourceFoundationService.findAll(
      orgName,
      atomName,
      query,
    );

    return entities;
  }

  async getForeignAtomName(
    orgName: string,
    atomName: string,
    electronName: string,
  ): Promise<string> {
    const metadata = await this.sourceFoundationService.getMetadata(
      orgName,
      atomName,
    );

    const electron = metadata.electrons.find(
      (electron) => electron.name === electronName,
    );

    if (!electron) {
      throw new Error(
        `Did not find specific electron in getForeignAtomName: ${electronName}`,
      );
    }

    if (typeof electron.referenceTo !== 'string' || !electron.referenceTo) {
      throw new Error(
        `Did not find specific referenceTo in getForeignAtomName: ${electronName}`,
      );
    }

    return electron.referenceTo;
  }
}
