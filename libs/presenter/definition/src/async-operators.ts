export type AsyncState = {
  loading: boolean;
  errorMessage: string | null;
  value: unknown;
  count?: number;
};

export const setAsyncState = (state: Partial<AsyncState>) => {
  return (previous: AsyncState) => ({
    ...previous,
    ...state,
  });
};

export const setAsyncPending = () => {
  return setAsyncState({ loading: true });
};

export const setAsyncSuccess = (data: { value: unknown; count?: number }) => {
  return setAsyncState({
    loading: false,
    errorMessage: null,
    value: data.value,
    count: data.count,
  });
};

export const setAsyncError = (error: unknown) => {
  return setAsyncState({
    loading: false,
    errorMessage: error instanceof Error ? error.message : '未知错误',
    value: null,
    count: undefined,
  });
};

export const initialAsyncState = () => {
  return setAsyncState({
    loading: false,
    errorMessage: null,
    value: null,
    count: undefined,
  });
};
