import { StoreCallback } from '@shukun/widget';
import produce from 'immer';

export const write = <SelectedState>(
  callback: (state: SelectedState) => void,
): StoreCallback<SelectedState> => {
  return (previous) => {
    return produce(previous, (draft: SelectedState) => {
      callback(draft);
    });
  };
};
