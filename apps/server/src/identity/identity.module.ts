import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { SystemSourceModule } from '../system-source/system-source.module';
import { PassportModule } from '../util/passport/passport.module';

import { PermissionControlService } from './permission-control.service';

import { RoleGeneratorService } from './role-generator.service';

import { TokenGeneratorService } from './token-generator.service';
import { TokenVerifyService } from './token-verify.service';

@Module({
  imports: [CoreModule, PassportModule, SystemSourceModule],
  providers: [
    RoleGeneratorService,
    PermissionControlService,
    TokenVerifyService,
    TokenGeneratorService,
  ],
  exports: [
    RoleGeneratorService,
    PermissionControlService,
    TokenVerifyService,
    TokenGeneratorService,
  ],
})
export class IdentityModule {}
