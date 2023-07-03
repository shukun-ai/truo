import { BehaviorSubject } from 'rxjs';

const previewRefreshEvent = new BehaviorSubject<Date>(new Date());

export const refreshPreview = () => {
  previewRefreshEvent.next(new Date());
};

export const getPreviewRefreshObservable = () => {
  return previewRefreshEvent.asObservable();
};
