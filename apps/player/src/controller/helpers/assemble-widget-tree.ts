import { PlayerContainer, PlayerTreeNode } from '@shukun/schema';

import { createCustomElement } from './create-custom-element';

export function assembleWidgetTree(
  parentElement: HTMLElement,
  childrenNodes: PlayerTreeNode[],
  context: {
    definition: PlayerContainer;
    containerName: string;
  },
) {
  childrenNodes.forEach((node) => {
    const schema = context.definition.widgets[getNodeId(node)];
    const element = createCustomElement(
      context.containerName,
      getNodeId(node),
      schema.tag,
    );
    parentElement.appendChild(element);

    const nextChildrenNodes = context.definition.tree[getNodeId(node)] ?? [];
    if (nextChildrenNodes.length > 0) {
      assembleWidgetTree(element, nextChildrenNodes, context);
    }
  });
}

function getNodeId(node: PlayerTreeNode) {
  return node;
}
