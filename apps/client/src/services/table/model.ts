import { ReactText } from 'react';

export interface FilterRawValues {
  [electronName: string]: ReactText | ReactText[];
}

export interface FilterQueryStringValues {
  [electronName: string]:
    | ReactText
    | boolean
    | { $in: ReactText[] }
    | { $regex: string };
}

export type SortQueryStringType = 'descend' | 'ascend' | null | undefined;

export interface SortQueryStringValues {
  [electronName: string]: SortQueryStringType;
}
