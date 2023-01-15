import { Injectable } from '@nestjs/common';
import { HttpQuerySchema, IDString } from '@shukun/schema';

import { PermissionControlService } from '../../identity/permission-control.service';

@Injectable()
export class SourceQueryPermissionService {
  constructor(
    private readonly permissionControlService: PermissionControlService,
  ) {}

  async buildOwnQuery(
    orgName: string,
    atomName: string,
    query: HttpQuerySchema,
    userId: IDString,
  ): Promise<HttpQuerySchema> {
    const permissionControl = await this.permissionControlService.create(
      orgName,
      userId,
    );
    if (
      !permissionControl.isOwner() &&
      permissionControl.getOwnValidator().onlyReadOwn(atomName)
    ) {
      return {
        ...query,
        filter: { $and: [{ owner: userId }, query.filter ?? {}] },
      };
    }
    return query;
  }
}
