import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { IdentityModule } from '../identity/identity.module';
import { SourceModule } from '../source/source.module';
import { PassportModule } from '../util/passport/passport.module';

import { SandboxService } from './sandbox.service';

@Module({
  imports: [CoreModule, SourceModule, PassportModule, IdentityModule],
  providers: [SandboxService],
  exports: [SandboxService],
})
export class SandboxModule {}
