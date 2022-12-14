import { BadRequestException, Injectable } from '@nestjs/common';
import { FlowEvent, FlowEventCompiledCode } from '@shukun/schema';

import { compileFailEvent } from './events/compile-fail';
import { compileRepeatEvent } from './events/compile-repeat';
import { compileSourceAddToManyEvent } from './events/compile-source-add-to-many';

import { compileSourceCreateEvent } from './events/compile-source-create';
import { compileSourceDeleteEvent } from './events/compile-source-delete';
import { compileSourceIncreaseEvent } from './events/compile-source-increase';

import { compileSourceQueryEvent } from './events/compile-source-query';
import { compileSourceRemoveFromManyEvent } from './events/compile-source-remove-from-many';
import { compileSourceUpdateEvent } from './events/compile-source-update';
import { compileStoreEvent } from './events/compile-store';
import { compileSuccessEvent } from './events/compile-success';

@Injectable()
export class CompileFactoryService {
  async compileEvent(event: FlowEvent): Promise<FlowEventCompiledCode> {
    switch (event.type) {
      case 'Success':
        return await compileSuccessEvent(event);
      case 'Fail':
        return await compileFailEvent(event);
      case 'SourceQuery':
        return await compileSourceQueryEvent(event);
      case 'SourceCreate':
        return await compileSourceCreateEvent(event);
      case 'SourceUpdate':
        return await compileSourceUpdateEvent(event);
      case 'SourceDelete':
        return await compileSourceDeleteEvent(event);
      case 'SourceAddToMany':
        return await compileSourceAddToManyEvent(event);
      case 'SourceRemoveFromMany':
        return await compileSourceRemoveFromManyEvent(event);
      case 'SourceIncrease':
        return await compileSourceIncreaseEvent(event);
      case 'Choice':
        throw new BadRequestException(
          'We did not support Choice type in this version.',
        );
      case 'Repeat':
        return await compileRepeatEvent(event);
      case 'Store':
        return await compileStoreEvent(event);
    }
  }
}
