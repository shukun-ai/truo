import { Inject, Injectable, LogLevel } from '@nestjs/common';
import { WorkflowConfigurations } from '@shukun/schema';

import { SourceService } from '../source/source.service';
import { ExecuteLog } from '../util/workflow/types';

export type GetLogItems = () => WorkflowLogItem[];

export interface WorkflowLogItem {
  level: LogLevel;
  value: any;
  date: string;
}

export class SystemWorkflowExecutionModel {
  workflowName!: string;
  executedConfigurations!: WorkflowConfigurations;
  logs?: WorkflowLogItem[];
  mode!: 'express' | 'test';
}

export interface CreateLog {
  executeLog: ExecuteLog;
  getLogItems: GetLogItems;
  saveLogs: () => Promise<void>;
}

export type ExecuteLogParams = {
  orgName: string;
  operatorId?: string;
} & SystemWorkflowExecutionModel;

@Injectable()
export class WebhookLogService {
  @Inject()
  private readonly workflowExecutionService!: SourceService<SystemWorkflowExecutionModel>;

  createExecuteLog(params: Omit<ExecuteLogParams, 'logs'>): CreateLog {
    const logs: WorkflowLogItem[] = [];

    const date = new Date().toISOString();

    const executeLog: ExecuteLog = (level: LogLevel, value: any) => {
      logs.push({
        level,
        value,
        date,
      });
    };

    const getLogItems = () => logs;

    return {
      executeLog,
      getLogItems,
      saveLogs: () =>
        this.saveLogs({
          ...params,
          logs,
        }),
    };
  }

  async saveLogs(params: ExecuteLogParams): Promise<void> {
    const {
      orgName,
      operatorId,
      workflowName,
      executedConfigurations,
      logs,
      mode,
    } = params;
    try {
      await this.workflowExecutionService.createOne(
        orgName,
        'system__workflow_executions',
        {
          workflowName,
          executedConfigurations: JSON.stringify(executedConfigurations),
          logs: JSON.stringify(logs),
          mode,
        },
        operatorId || null,
      );
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }
}
