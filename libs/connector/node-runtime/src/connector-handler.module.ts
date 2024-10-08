import { Module } from '@nestjs/common';

import { ConnectorHandlerService } from './connector-handler.service';

@Module({
  controllers: [],
  providers: [ConnectorHandlerService],
  exports: [ConnectorHandlerService],
})
export class ConnectorHandlerModule {}
