import { Module } from '@nestjs/common';

import { SourceModule } from '../source/source.module';

import { SystemGroupService } from './system-group.service';
import { SystemPositionService } from './system-position.service';
import { SystemUserService } from './system-user.service';

@Module({
  imports: [SourceModule],
  providers: [SystemUserService, SystemPositionService, SystemGroupService],
  exports: [SystemUserService, SystemPositionService, SystemGroupService],
})
export class SystemSourceModule {}
