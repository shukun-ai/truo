import { validateQueryFilter } from '../schema-validators/http-query/validate-query-filter';

export function isQueryFilter(value: unknown): boolean {
  try {
    validateQueryFilter(value);
    return true;
  } catch (error) {
    return false;
  }
}
