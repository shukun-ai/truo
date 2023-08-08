import { StoreCallback } from '@shukun/presenter/definition';
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
