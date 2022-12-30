import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { PassportModule } from '../util/passport/passport.module';

import { MongoAdaptorService } from './adaptor/mongo-adaptor.service';
import { MongoQueryConvertorService } from './adaptor/mongo-query-convertor.service';
import { MongooseConnectionService } from './adaptor/mongoose-connection.service';
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
