import { ShukunWidgetClass } from '@shukun/widget';

import { ContainerWidget } from './widget/container-widget';
import { InputWidget } from './widget/input-widget';
import { TextWidget } from './widget/text-widget';

export function getLocalWidgetClasses(): Record<string, ShukunWidgetClass> {
  return {
    'sk-text': TextWidget,
    'sk-input': InputWidget,
    'sk-container': ContainerWidget,
  };
}
