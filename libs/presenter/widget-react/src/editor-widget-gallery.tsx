import { WidgetGallery } from '@shukun/component';
import {
  IconAlphabetLatin,
  IconBorderAll,
  IconBoxModel2,
  IconColumns,
  IconListTree,
  IconPointer,
} from '@tabler/icons-react';

export const editorWidgetGallery: WidgetGallery = [
  {
    sectionId: 'layout',
    label: '布局',
    widgets: [
      {
        tag: 'box',
        icon: () => <IconBoxModel2 />,
        label: '盒子',
      },
      {
        tag: 'list',
        icon: () => <IconListTree />,
        label: '列表',
      },
    ],
  },
  {
    sectionId: 'basic',
    label: '基础',
    widgets: [
      {
        tag: 'text',
        icon: () => <IconAlphabetLatin />,
        label: '文字',
      },
      {
        tag: 'button',
        icon: () => <IconPointer />,
        label: '按钮',
      },
    ],
  },
  {
    sectionId: 'table',
    label: '表格',
    widgets: [
      {
        tag: 'table',
        icon: () => <IconBorderAll />,
        label: '表格容器',
      },
      {
        tag: 'tableColumn',
        icon: () => <IconColumns />,
        label: '表格列',
      },
    ],
  },
];
