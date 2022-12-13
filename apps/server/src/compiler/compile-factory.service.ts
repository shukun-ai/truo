import { Injectable } from '@nestjs/common';
import { FlowEvent, FlowEventCompiledCode } from '@shukun/schema';

import { compileSourceQueryEvent } from './events/compile-source-query';
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
      // case 'SourceCreate':
      //   return await compileSuccessEvent(event);
      // case 'SourceUpdate':
      //   return await compileSuccessEvent(event);
      // case 'SourceDelete':
      //   return await compileSuccessEvent(event);
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
      default:
        throw new Error();
    }
  }
}
