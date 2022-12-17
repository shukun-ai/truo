import {
  FlowEvent,
  FlowEventFailSchema,
  FlowEventSourceAddToManySchema,
  FlowEventSourceCreateSchema,
  FlowEventSourceDeleteSchema,
  FlowEventSourceQuerySchema,
  FlowEventSourceUpdateSchema,
  FlowEventStoreSchema,
  FlowEventSuccessSchema,
  FlowEventSourceRemoveFromManySchema,
  FlowEventSourceIncreaseSchema,
  FlowEventChoiceSchema,
  FlowEventRepeatSchema,
  FlowEventParallelSchema,
  FlowEventFirstOrThrowSchema,
  FlowEventLastOrThrowSchema,
} from '@shukun/schema';

import { EventSchema } from './interface/event-schema';

export const eventSchemas: Record<FlowEvent['type'], EventSchema> = {
  Success: FlowEventSuccessSchema,
  Fail: FlowEventFailSchema,
  SourceQuery: FlowEventSourceQuerySchema,
  SourceCreate: FlowEventSourceCreateSchema,
  SourceUpdate: FlowEventSourceUpdateSchema,
  SourceDelete: FlowEventSourceDeleteSchema,
  SourceAddToMany: FlowEventSourceAddToManySchema,
  SourceRemoveFromMany: FlowEventSourceRemoveFromManySchema,
  SourceIncrease: FlowEventSourceIncreaseSchema,
  Choice: FlowEventChoiceSchema,
  Repeat: FlowEventRepeatSchema,
  Parallel: FlowEventParallelSchema,
  Store: FlowEventStoreSchema,
  FirstOrThrow: FlowEventFirstOrThrowSchema,
  LastOrThrow: FlowEventLastOrThrowSchema,
};
