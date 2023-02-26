import { PlayerContainer } from '@shukun/schema';

import { createCustomElement } from './create-custom-element';

export function assembleWidgetTree(
  parentElement: HTMLElement,
  childrenNames: string[],
  context: {
    definition: PlayerContainer;
    containerName: string;
  },
) {
  childrenNames.forEach((name) => {
    const schema = context.definition.widgets[name];
    const element = createCustomElement(
      context.containerName,
      name,
      schema.tag,
    );
    parentElement.appendChild(element);

    const nextChildrenNames = context.definition.tree[name] ?? [];
    if (nextChildrenNames.length > 0) {
      assembleWidgetTree(element, nextChildrenNames, context);
    }
  });
}
