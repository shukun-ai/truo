import { SearchQuery } from './query';
import { SearchService } from './service';
import { SearchStore } from './store';

export * from './constant';
export * from './model';
export * from './service';

export const searchStore = new SearchStore();
export const searchQuery = new SearchQuery(searchStore);
export const searchService = new SearchService(searchStore);
