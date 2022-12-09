import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { PassportModule } from '../util/passport/passport.module';

import { MongoAdaptorService } from './adaptor/mongo-adaptor.service';
import { MongoQueryConvertorService } from './adaptor/mongo-query-convertor.service';
import { MongooseConnectionService } from './adaptor/mongoose-connection.service';
import { SourceDataAccessService } from './source-data-access.service';
import { SourceNextStandardService } from './source-next-standard.service';

import { SourceParamUtilService } from './source-param-util.service';
import { SourceService } from './source.service';
import { VariableService } from './variable/variable.service';

@Module({
  imports: [CoreModule, PassportModule],
  providers: [
    SourceService,
    SourceParamUtilService,
    VariableService,
    MongoAdaptorService,
    MongoQueryConvertorService,
    MongooseConnectionService,
    SourceDataAccessService,
    SourceNextStandardService,
  ],
  exports: [SourceService, SourceNextStandardService, VariableService],
})
export class SourceModule {}
