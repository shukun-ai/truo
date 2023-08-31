import {
  editorWidgets,
  editorWidgetGallery,
} from '@shukun/presenter/widget-react';
import { WidgetSchema } from '@shukun/schema';

export const widgetDefinitions: Record<string, WidgetSchema> = editorWidgets;

export const widgetGallery = editorWidgetGallery;
