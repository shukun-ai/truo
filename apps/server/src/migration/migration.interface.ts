import { MigrationDifference } from '@shukun/schema';

export interface IMigrationService {
  preview(orgName: string): Promise<MigrationDifference>;
  execute(orgName: string): Promise<void>;
}
