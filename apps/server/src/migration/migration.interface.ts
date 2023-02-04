import { DiffResult } from './migration.type';

export interface IMigrationService {
  preview(orgName: string): Promise<DiffResult>;
  execute(orgName: string): Promise<void>;
}
