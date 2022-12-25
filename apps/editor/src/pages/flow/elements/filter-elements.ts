import { FlowEvents } from '@shukun/schema';

export function filterSubEventNames(events: FlowEvents): string[] {
  const defaultValue: string[] = [];
  return Object.keys(events).reduce((previous, eventName) => {
    return filterSubEvent(previous, eventName, events, false);
  }, defaultValue);
}

export function filterRootEventNames(
  events: FlowEvents,
  subEventNames: string[],
): string[] {
  const defaultValue: string[] = [];
  return Object.keys(events).reduce((previous, eventName) => {
    if (subEventNames.includes(eventName)) {
      return previous;
    } else {
      return [...previous, eventName];
    }
  }, defaultValue);
}

function filterSubEvent(
  previousEventNames: string[],
  startEventName: string,
  events: FlowEvents,
  isSub: boolean,
): string[] {
  if (!startEventName || !events[startEventName]) {
    return previousEventNames;
  }

  const event = events[startEventName];

  if (event.type === 'Success') {
    return combinePreviousEventNames(previousEventNames, startEventName, isSub);
  }

  if (event.type === 'Fail') {
    return combinePreviousEventNames(previousEventNames, startEventName, isSub);
  }

  if (event.type === 'Repeat') {
    return filterSubEvent(
      previousEventNames,
      event.startEventName,
      events,
      true,
    );
  }

  if (event.type === 'Parallel') {
    return event.branches.reduce((previous, current) => {
      return filterSubEvent(previous, current.startEventName, events, true);
    }, previousEventNames);
  }

  return filterSubEvent(
    combinePreviousEventNames(previousEventNames, startEventName, isSub),
    event.next,
    events,
    isSub,
  );
}

function combinePreviousEventNames(
  previousEventNames: string[],
  startEventName: string,
  isSub: boolean,
) {
  if (!isSub) {
    return previousEventNames;
  }

  if (previousEventNames.includes(startEventName)) {
    return previousEventNames;
  }

  return [...previousEventNames, startEventName];
}
