import { createContext } from 'react';

export interface EventNodeContextProps {
  editing: boolean;
}

export const EventNodeContext = createContext<EventNodeContextProps>({
  editing: false,
});
