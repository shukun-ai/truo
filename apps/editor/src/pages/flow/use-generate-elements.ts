import { FlowEvent } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';

import { flowQuery } from '../../services/flow';

import { prepareSpecialChoiceEventElements } from './elements/choice-elements';

import { prepareCommonEventElements } from './elements/common-elements';
import {
  filterSubEventNames,
  filterRootEventNames,
} from './elements/filter-elements';

import { prepareFunctionalElements } from './elements/functional-elements';
import { prepareSpecialParallelEventElements } from './elements/parallel-elements';
import { prepareSpecialRepeatEventElements } from './elements/repeat-elements';

import { FlowElements } from './interface/element';

export function useGenerateElement(): FlowElements {
  const flow = useObservableState(flowQuery.activeFlow$);

  const elements: FlowElements = {
    nodes: [],
    edges: [],
  };

  if (!flow) {
    return elements;
  }

  const { startEventName, events } = flow;

  const subEventNames = filterSubEventNames(events);
  const rootEventNames = filterRootEventNames(events, subEventNames);

  for (let index = 0; index < rootEventNames.length; index++) {
    const eventName = rootEventNames[index];
    const event = events[eventName];

    const { nodes, edges } = prepareCommonEventElements(eventName, event);

    elements.nodes = [...elements.nodes, ...nodes];
    elements.edges = [...elements.edges, ...edges];

    {
      const { nodes, edges } = prepareSpecialEventElements(eventName, event);
      elements.nodes = [...elements.nodes, ...nodes];
      elements.edges = [...elements.edges, ...edges];
    }
  }

  {
    const { nodes, edges } = prepareFunctionalElements(startEventName);

    elements.nodes = [...elements.nodes, ...nodes];
    elements.edges = [...elements.edges, ...edges];
  }

  return elements;
}

function prepareSpecialEventElements(
  eventName: string,
  event: FlowEvent,
): FlowElements {
  switch (event.type) {
    case 'Choice':
      return prepareSpecialChoiceEventElements(eventName, event);
    case 'Parallel':
      return prepareSpecialParallelEventElements(eventName, event);
    case 'Repeat':
      return prepareSpecialRepeatEventElements(eventName, event);
    default:
      return {
        nodes: [],
        edges: [],
      };
  }
}
