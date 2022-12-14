import { BadRequestException, Injectable } from '@nestjs/common';
import { FlowEvent, FlowEventCompiledCode } from '@shukun/schema';

import { compileSourceCreateEvent } from './events/compile-source-create';
import { compileSourceDeleteEvent } from './events/compile-source-delete';

import { compileSourceQueryEvent } from './events/compile-source-query';
import { compileSourceUpdateEvent } from './events/compile-source-update';
import { compileStoreEvent } from './events/compile-store';
import { compileSuccessEvent } from './events/compile-success';

@Injectable()
export class CompileFactoryService {
  async compileEvent(event: FlowEvent): Promise<FlowEventCompiledCode> {
    switch (event.type) {
      case 'Success':
        return await compileSuccessEvent(event);
      // case 'Fail':
      //   return await compileSuccessEvent(event);
      case 'SourceQuery':
        return await compileSourceQueryEvent(event);
      case 'SourceCreate':
        return await compileSourceCreateEvent(event);
      case 'SourceUpdate':
        return await compileSourceUpdateEvent(event);
      case 'SourceDelete':
        return await compileSourceDeleteEvent(event);
      // case 'SourceAddToMany':
      //   return await compileSuccessEvent(event);
      // case 'SourceRemoveFromMany':
      //   return await compileSuccessEvent(event);
      // case 'SourceIncrease':
      //   return await compileSuccessEvent(event);
      // case 'Choice':
      //   return await compileSuccessEvent(event);
      // case 'Repeat':
      //   return await compileSuccessEvent(event);
      case 'Store':
        return await compileStoreEvent(event);
      default:
        throw new BadRequestException(
          `We did not support this event type: ${event.type}`,
        );
    }
  }
}
