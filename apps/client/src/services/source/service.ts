import { ReferenceUtil } from './classes/ReferenceUtil';
import { SourceReferenceService } from './classes/SourceReferenceService';
import { SourceService } from './classes/SourceService';

export const referenceUtil = new ReferenceUtil();

export const sourceService = new SourceService();

export const sourceReferenceService = new SourceReferenceService(
  sourceService,
  referenceUtil,
);
