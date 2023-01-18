import {
  ApplicationSchema,
  MetadataSchema,
  RoleSchema,
  ViewSchema,
  WorkflowSchema,
} from '@shukun/schema';

/**
 * @move to @shukun/schema
 */
export interface InspectionResponse {
  title: ApplicationSchema['title'];
  description?: ApplicationSchema['description'];
  metadata?: Pick<MetadataSchema, 'name' | 'label' | 'electrons'>[];
  views?: Pick<
    ViewSchema,
    'name' | 'label' | 'type' | 'isVisible' | 'parentName' | 'priority'
  >[];
  workflows?: Pick<
    WorkflowSchema,
    'name' | 'description' | 'isEnabledWebhook' | 'validations'
  >[];
  roles?: Pick<RoleSchema, 'name' | 'label'>[];
}
