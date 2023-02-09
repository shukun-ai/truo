import {
  FlowEvent,
  flowEventFailSchema,
  flowEventSourceAddToManySchema,
  flowEventSourceCreateSchema,
  flowEventSourceDeleteSchema,
  flowEventSourceQuerySchema,
  flowEventSourceUpdateSchema,
  flowEventStoreSchema,
  flowEventSuccessSchema,
  flowEventSourceRemoveFromManySchema,
  flowEventSourceIncreaseSchema,
  flowEventChoiceSchema,
  flowEventRepeatSchema,
  flowEventParallelSchema,
  flowEventFirstOrThrowSchema,
  flowEventLastOrThrowSchema,
} from '@shukun/schema';

import { EventSchema } from './interface/event-schema';

export const eventSchemas: Record<FlowEvent['type'], EventSchema> = {
  Success: flowEventSuccessSchema as EventSchema,
  Fail: flowEventFailSchema as EventSchema,
  SourceQuery: flowEventSourceQuerySchema as EventSchema,
  SourceCreate: flowEventSourceCreateSchema as EventSchema,
  SourceUpdate: flowEventSourceUpdateSchema as EventSchema,
  SourceDelete: flowEventSourceDeleteSchema as EventSchema,
  SourceAddToMany: flowEventSourceAddToManySchema as EventSchema,
  SourceRemoveFromMany: flowEventSourceRemoveFromManySchema as EventSchema,
  SourceIncrease: flowEventSourceIncreaseSchema as EventSchema,
  Choice: flowEventChoiceSchema as EventSchema,
  Repeat: flowEventRepeatSchema as EventSchema,
  Parallel: flowEventParallelSchema as EventSchema,
  Store: flowEventStoreSchema as EventSchema,
  FirstOrThrow: flowEventFirstOrThrowSchema as EventSchema,
  LastOrThrow: flowEventLastOrThrowSchema as EventSchema,
};
