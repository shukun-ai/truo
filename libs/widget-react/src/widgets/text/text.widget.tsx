import { textDefinition } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const TextWidget = createWidget(textDefinition, ({ value }) => {
  return <>${value}</>;
});
