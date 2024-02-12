import { Controller, Get, Param, Res } from '@nestjs/common';
import { RoleResourceType, UnknownSourceModel } from '@shukun/schema';

import { Response } from 'express';

import { SourceService } from '../../source/source.service';

import { apiPrefix } from '../prefix';

@Controller(`${apiPrefix}/${RoleResourceType.Developer}/:orgName`)
export class DeveloperCsvController {
  constructor(private readonly sourceService: SourceService<unknown>) {}

  @Get('csv/:atomName')
  async push(
    @Param('orgName') orgName: string,
    @Param('atomName') atomName: string,
    @Res() response: Response,
  ): Promise<unknown> {
    const metadata = await this.sourceService.getMetadata(orgName, atomName);
    const fields = ['_id', 'owner', 'createdAt', 'updatedAt'].concat(
      metadata.electrons.map((electron) => electron.name),
    );
    const values = await this.sourceService.query(orgName, atomName, {
      limit: 0,
    });

    let files = '';

    files += fields.join(',') + '\n';

    values.forEach((value) => {
      files +=
        fields
          .map((field) => {
            const electronName = field;
            // eslint-disable-next-line security/detect-object-injection
            const cell = (value as UnknownSourceModel)[electronName];

            if (typeof cell === undefined) {
              return '';
            }
            if (typeof cell === null) {
              return '';
            }
            if (cell instanceof Date) {
              return cell.toISOString();
            }
            if (typeof cell === 'boolean') {
              return cell ? 'true' : 'false';
            }
            return cell ?? '';
          })
          .join(',') + '\n';
    });

    return response
      .set('Content-Type', 'text/csv')
      .setHeader('Content-disposition', `attachment; filename=${atomName}.csv`)
      .send(files);
  }
}
