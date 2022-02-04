import { CustomModalQuery } from './query';
import { CustomModalService } from './service';
import { CustomModalStore } from './store';

export const customModalStore = new CustomModalStore();
export const customModalQuery = new CustomModalQuery(customModalStore);
export const customModalService = new CustomModalService(customModalStore);
