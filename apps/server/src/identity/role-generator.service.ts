import { Injectable } from '@nestjs/common';

import { SystemGroupService } from '../system-source/system-group.service';
import { SystemPositionService } from '../system-source/system-position.service';

@Injectable()
export class RoleGeneratorService {
  constructor(
    private readonly systemGroupService: SystemGroupService,
    private readonly systemPositionService: SystemPositionService,
  ) {}

  async getRoleNames(orgName: string, userId: string) {
    // TODO Add redis to save cache.
    const groups = await this.systemGroupService.findAll(orgName, userId);
    const positions = await this.systemPositionService.findAll(orgName, userId);

    let roleNames: string[] = [];

    // TODO Find groups and subs.
    groups.forEach((item) => {
      roleNames = [...roleNames, ...item.roles];
    });

    positions.forEach((item) => {
      roleNames = [...roleNames, ...item.roles];
    });

    return roleNames;
  }
}
