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
  Success: flowEventSuccessSchema,
  Fail: flowEventFailSchema,
  SourceQuery: flowEventSourceQuerySchema,
  SourceCreate: flowEventSourceCreateSchema,
  SourceUpdate: flowEventSourceUpdateSchema,
  SourceDelete: flowEventSourceDeleteSchema,
  SourceAddToMany: flowEventSourceAddToManySchema,
  SourceRemoveFromMany: flowEventSourceRemoveFromManySchema,
  SourceIncrease: flowEventSourceIncreaseSchema,
  Choice: flowEventChoiceSchema,
  Repeat: flowEventRepeatSchema,
  Parallel: flowEventParallelSchema,
  Store: flowEventStoreSchema,
  FirstOrThrow: flowEventFirstOrThrowSchema,
  LastOrThrow: flowEventLastOrThrowSchema,
};
