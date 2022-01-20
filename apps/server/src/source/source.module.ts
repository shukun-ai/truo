import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { PassportModule } from '../util/passport/passport.module';

import { SourceSchemaUtilService } from './source-schema-util.service';
import { SourceService } from './source.service';
import { VariableService } from './variable/variable.service';

@Module({
  imports: [CoreModule, PassportModule],
  providers: [SourceService, SourceSchemaUtilService, VariableService],
  exports: [SourceService, VariableService],
})
export class SourceModule {}
