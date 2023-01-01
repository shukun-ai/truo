import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { PassportModule } from '../util/passport/passport.module';

import { MongoAdaptorService } from './mongo/mongo-adaptor.service';
import { MongoQueryConvertorService } from './mongo/mongo-query-convertor.service';
import { MongooseConnectionService } from './mongo/mongoose-connection.service';
import { SourceDataAccessService } from './source-data-access.service';
import { SourceForeignQueryService } from './source-foreign-query.service';
import { SourceFoundationService } from './source-foundation.service';

import { SourceParamUtilService } from './source-param-util.service';
import { SourceService } from './source.service';
import { VariableService } from './variable/variable.service';

@Module({
  imports: [CoreModule, PassportModule],
  providers: [
    SourceService,
    SourceFoundationService,
    SourceParamUtilService,
    VariableService,
    MongoAdaptorService,
    MongoQueryConvertorService,
    MongooseConnectionService,
    SourceDataAccessService,
    SourceForeignQueryService,
  ],
  exports: [SourceService, VariableService],
})
export class SourceModule {}
