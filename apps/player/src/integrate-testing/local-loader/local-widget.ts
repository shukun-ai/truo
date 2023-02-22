import { ShukunWidgetClass } from '@shukun/widget';

import { ButtonWidget } from './widget/button-widget';
import { ContainerWidget } from './widget/container-widget';

import { InputWidget } from './widget/input-widget';

import { LayoutWidget } from './widget/layout-widget';
import { TextWidget } from './widget/text-widget';

export function getLocalWidgetClasses(): Record<string, ShukunWidgetClass> {
  return {
    'sk-text': TextWidget,
    'sk-input': InputWidget,
    'sk-layout': LayoutWidget,
    'sk-button': ButtonWidget,
    'sk-container': ContainerWidget,
  };
}

// export class WidgetLoader {
//   public async loadSchemas(): Promise<Record<string, WidgetSchema>> {
//     return {
//       'sk-text': {
//         tag: 'sk-text',
//         states: {
//           title: {
//             editLabel: 'Title',
//             editType: 'template',
//           },
//         },
//         events: {},
//       },
//       'sk-input': {
//         tag: 'sk-input',
//         states: {
//           label: {
//             editLabel: 'Label',
//             editType: 'template',
//           },
//           value: {
//             editLabel: 'Value',
//             editType: 'template',
//           },
//         },
//         events: {
//           change: {
//             editLabel: 'When change',
//           },
//         },
//       },
//       'sk-layout': {
//         tag: 'sk-layout',
//         states: {},
//         events: {},
//       },
//       'sk-page': {
//         tag: 'sk-page',
//         states: {},
//         events: {},
//       },
//     };
//   }
