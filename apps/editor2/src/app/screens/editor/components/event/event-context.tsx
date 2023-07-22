import { TypeException } from '@shukun/exception';
import { PresenterEvent } from '@shukun/schema';
import { ReactNode, createContext, useContext } from 'react';

export type EventContextProps = {
  containerName: string;
  event: PresenterEvent;
  index: number;
  events: PresenterEvent[];
  onChange: (events: PresenterEvent[]) => void;
};

const EventContext = createContext<EventContextProps | null>(null);

export const EventProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: EventContextProps;
}) => <EventContext.Provider value={value}>{children}</EventContext.Provider>;

export const useEventContext = (): EventContextProps => {
  const eventContext = useContext(EventContext);
  if (!eventContext) {
    throw new TypeException('The eventContext is not initialize.');
  }
  return eventContext;
};

export const add = (
  events: PresenterEvent[],
  event: PresenterEvent,
): PresenterEvent[] => {
  const clonedNews = structuredClone(events);
  clonedNews.push(event);
  return clonedNews;
};

export const update = (
  events: PresenterEvent[],
  index: number,
  event: PresenterEvent,
): PresenterEvent[] => {
  const clonedEvents = structuredClone(events);
  clonedEvents.splice(index, 1, event);
  return clonedEvents;
};

export const remove = (
  events: PresenterEvent[],
  index: number,
): PresenterEvent[] => {
  const clonedEvents = structuredClone(events);
  clonedEvents.splice(index, 1);
  return clonedEvents;
};

export const move = (
  events: PresenterEvent[],
  source: number,
  target: number,
): PresenterEvent[] => {
  const clonedEvents = structuredClone(events);
  const event = clonedEvents[source];
  if (!event) {
    throw new TypeException('Did not find event in events.');
  }
  events.splice(source, 1);
  events.splice(target, 0, event);
  return events;
};
