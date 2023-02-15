import { WidgetSchema } from '@shukun/schema';

import { Layout } from '../components/layout';
import { Page } from '../components/page';
import { Text } from '../components/text';

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

  public async loadWidgets(): Promise<
    Record<string, CustomElementConstructor>
  > {
    return {
      'sk-text': Text,
      // 'sk-input': Input,
      'sk-layout': Layout,
      'sk-page': Page,
    };
  }
}
