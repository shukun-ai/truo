import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

export interface EventCodeModalState {
  visible: boolean;
  value?: string;
  onFinish?: (value: string) => void;
}

export const eventCodeModalDefaultValue: EventCodeModalState = {
  visible: false,
  value: undefined,
  onFinish: undefined,
};

const eventCodeModalStore = new BehaviorSubject<EventCodeModalState>(
  eventCodeModalDefaultValue,
);

export const eventCodeModalStoreQuery = eventCodeModalStore.pipe(
  distinctUntilChanged(),
);

export function openEventCodeModal(
  value: string,
  onFinish: NonNullable<EventCodeModalState['onFinish']>,
) {
  eventCodeModalStore.next({ visible: true, value, onFinish });
}

export function closeEventCodeModal() {
  eventCodeModalStore.next(eventCodeModalDefaultValue);
}

export function updateValue(value: string) {
  eventCodeModalStore.next({
    ...eventCodeModalStore.getValue(),
    value,
  });
}
