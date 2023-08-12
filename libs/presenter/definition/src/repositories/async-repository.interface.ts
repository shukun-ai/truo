import { PresenterEvent } from '@shukun/schema';

export type AsyncState = {
  loading: boolean;
  errorMessage: string | null;
  data: Record<string, unknown>;
};

export interface IAsyncRepository {
  run(event: PresenterEvent, payload: unknown): Promise<void>;
}
