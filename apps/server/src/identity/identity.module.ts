import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { SystemSourceModule } from '../system-source/system-source.module';
import { PassportModule } from '../util/passport/passport.module';

import { RoleGeneratorService } from './role-generator.service';

import { TokenGeneratorService } from './token-generator.service';
import { TokenVerifyService } from './token-verify.service';

@Module({
  imports: [CoreModule, PassportModule, SystemSourceModule],
  providers: [RoleGeneratorService, TokenVerifyService, TokenGeneratorService],
  exports: [RoleGeneratorService, TokenVerifyService, TokenGeneratorService],
})
export class IdentityModule {}
