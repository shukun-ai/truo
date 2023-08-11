import { PresenterScreen } from '@shukun/schema';

export type AvailableSlots = Record<PresenterScreen['layout'], SlotStructure[]>;

// TODO refactor using JSON Schema or Widget Combination Design
export const availableSlots: AvailableSlots = {
  Dashboard: [
    {
      name: 'main',
      required: true,
      enableAutoCreating: true,
    },
    {
      name: 'menu',
      required: false,
    },
  ],
  Workshop: [
    {
      name: 'main',
      required: true,
      enableAutoCreating: true,
    },
    {
      name: 'menu',
      required: false,
    },
  ],
};

export type SlotStructure = {
  name: string;
  required: boolean;
  enableAutoCreating?: boolean;
};
