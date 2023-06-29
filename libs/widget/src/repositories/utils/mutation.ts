import produce from 'immer';

import { StoreCallback } from '../../interfaces/store.interface';

export const write = <SelectedState>(
  callback: (state: SelectedState) => void,
): StoreCallback<SelectedState> => {
  return (previous) => {
    return produce(previous, (draft: SelectedState) => {
      callback(draft);
    });
  };
};
