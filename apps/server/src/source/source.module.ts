import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { PassportModule } from '../util/passport/passport.module';

import { KnexAdaptorService } from './knex/knex-adaptor.service';
import { KnexConnectionService } from './knex/knex-connection.service';
import { KnexElectronConvertorService } from './knex/knex-electron-convertor.service';
import { KnexExceptionHandlerService } from './knex/knex-exception-handler.service';
import { KnexQueryConvertorService } from './knex/knex-query-convertor.service';
import { MongoAdaptorService } from './mongo/mongo-adaptor.service';
import { MongoConnectionService } from './mongo/mongo-connection.service';
import { MongoQueryConvertorService } from './mongo/mongo-query-convertor.service';
import { MongooseConnectionService } from './mongo/mongoose-connection.service';
import { MongoExceptionHandlerService } from './mongo/monogo-exception-handler.service';
import { SourceDataAccessService } from './source-data-access.service';
import { SourceDtoConstraintService } from './source-dto-constraint.service';
import { SourceExceptionService } from './source-exception.service';
import { SourceFieldFilterService } from './source-field-filter.service';
import { SourceForeignQueryService } from './source-foreign-query.service';
import { SourceFoundationService } from './source-foundation.service';

import { SourceMainDbTestService } from './source-main-db-test.service';
import { SourceParamUtilService } from './source-param-util.service';
import { SourceService } from './source.service';

@Module({
  imports: [CoreModule, PassportModule],
  providers: [
    SourceService,
    SourceFoundationService,
    SourceParamUtilService,
    SourceDtoConstraintService,
    MongoAdaptorService,
    MongoQueryConvertorService,
    MongooseConnectionService,
    MongoConnectionService,
    MongoExceptionHandlerService,
    KnexAdaptorService,
    KnexConnectionService,
    KnexQueryConvertorService,
    KnexElectronConvertorService,
    KnexExceptionHandlerService,
    SourceDataAccessService,
    SourceForeignQueryService,
    SourceFieldFilterService,
    SourceExceptionService,
    SourceMainDbTestService,
  ],
  exports: [SourceService, SourceMainDbTestService],
})
export class SourceModule {}
