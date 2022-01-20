import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { SourceModule } from '../source/source.module';
import { PassportModule } from '../util/passport/passport.module';

import { SecurityService } from './security.service';

@Module({
  imports: [CoreModule, PassportModule, SourceModule],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class IdentityModule {}
