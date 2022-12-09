export type SortQueryStringType = 'descend' | 'ascend' | null | undefined;

export interface SortQueryStringValues {
  [electronName: string]: SortQueryStringType;
}
