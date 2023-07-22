import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { SourceModule } from '../source/source.module';

import { TenantService } from './tenant.service';

@Module({
  imports: [CoreModule, SourceModule],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
