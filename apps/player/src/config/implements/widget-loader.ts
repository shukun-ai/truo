import { WidgetSchema } from '@shukun/schema';
import { ShukunWidgetClass } from '@shukun/widget';

import { ButtonWidget } from '../../components/button-widget';

import { InputWidget } from '../../components/input-widget';

import { LayoutWidget } from '../../components/layout-widget';
import { TextWidget } from '../../components/text-widget';

export class WidgetLoader {
  public async loadSchemas(): Promise<Record<string, WidgetSchema>> {
    return {
      'sk-text': {
        tag: 'sk-text',
        states: {
          title: {
            editLabel: 'Title',
            editType: 'template',
          },
        },
        events: {},
      },
      'sk-input': {
        tag: 'sk-input',
        states: {
          label: {
            editLabel: 'Label',
            editType: 'template',
          },
          value: {
            editLabel: 'Value',
            editType: 'template',
          },
        },
        events: {
          change: {
            editLabel: 'When change',
          },
        },
      },
      'sk-layout': {
        tag: 'sk-layout',
        states: {},
        events: {},
      },
      'sk-page': {
        tag: 'sk-page',
        states: {},
        events: {},
      },
    };
  }

  public async loadWidgets(): Promise<Record<string, ShukunWidgetClass>> {
    return {
      'sk-text': TextWidget,
      'sk-input': InputWidget,
      'sk-layout': LayoutWidget,
      'sk-button': ButtonWidget,
    };
  }
}
