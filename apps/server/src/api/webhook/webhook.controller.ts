import { IncomingHttpHeaders } from 'http';

import {
  Controller,
  NotFoundException,
  Param,
  Post,
  Req,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { RoleResourceType, WorkflowSchema } from '@shukun/schema';
import { validateWorkflowInput } from '@shukun/validator';
import { omit } from 'lodash';

import { EXCEPTION_WEBHOOK_TEST_NAME } from '../../app.constant';
import { WorkflowService } from '../../core/workflow.service';
import { ExternalContext } from '../../flow/flow.interface';
import { FlowService } from '../../flow/flow.service';
import { SecurityRequest } from '../../identity/utils/security-request';
import { QueryResponseInterceptor } from '../../util/query/interceptors/query-response.interceptor';
import { QueryResponse } from '../../util/query/interfaces';
import { executeWorkflow } from '../../util/workflow/execution';
import { ResourceService } from '../../webhook/resource.service';

import { WebhookLogService } from '../../webhook/webhook-log.service';

// TODO must remove @UseInterceptors(QueryResponseInterceptor) next webhook to support free-format http response.
@Controller(`${RoleResourceType.Webhook}/:orgName`)
@UseInterceptors(QueryResponseInterceptor)
export class WebhookController {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly workflowService: WorkflowService,
    private readonly webhookLogService: WebhookLogService,
    private readonly flowService: FlowService,
  ) {}

  // @deprecated for security.
  // @Post('/:workflowName/test')
  // async testWebhook(
  //   @Req() req: SecurityRequest,
  //   @Param('orgName') orgName: string,
  //   @Param('workflowName') workflowName: string,
  // ) {
  //   const isTestMode = true;
  //   return await this.webhook(req, orgName, workflowName, isTestMode);
  // }

  isFlowVersion(headers: IncomingHttpHeaders) {
    return !!headers['x-flow-version'];
  }

  async handleFlowVersion(
    req: SecurityRequest,
    orgName: string,
    workflowName: string,
  ): Promise<QueryResponse<unknown>> {
    const externalContext: ExternalContext = {
      orgName,
      operatorId: req.userId,
    };
    const output = await this.flowService.execute(
      orgName,
      workflowName,
      req.body,
      externalContext,
    );

    return {
      value: output,
    };
  }

  @Post(':workflowName')
  async webhook(
    @Req() req: SecurityRequest,
    @Param('orgName') orgName: string,
    @Param('workflowName') workflowName: string,
    isTestMode?: boolean,
  ): Promise<any> {
    if (this.isFlowVersion(req.headers)) {
      return await this.handleFlowVersion(req, orgName, workflowName);
    }

    const workflow = await this.workflowService.findOne(orgName, workflowName);

    if (!workflow.isEnabledWebhook) {
      throw new NotFoundException('We did not find the enabled workflow.');
    }

    if (!workflow.configurations) {
      throw new NotFoundException('The configuration of workflow is empty.');
    }

    this.validateBody(workflow, req.body);

    const operatorId = req.userId;

    const headers = omit(req.headers, 'authorization');

    const log = this.createExecuteLog(
      orgName,
      workflow,
      operatorId,
      isTestMode,
    );

    const input = {
      headers,
      body: req.body,
    };

    try {
      const output = await executeWorkflow(
        workflow.configurations,
        input,
        this.resourceService.createExecution(orgName, {
          operatorId,
        }),
        {
          executeLog: log && log.executeLog,
        },
      );
      return {
        ...{ [EXCEPTION_WEBHOOK_TEST_NAME]: log && log.getLogItems() },
        ...output,
      };
    } catch (error) {
      (error as any).workflowLog = log?.getLogItems();
      (error as any).workflowTestMode = isTestMode;
      throw error;
    }
  }

  private createExecuteLog(
    orgName: string,
    workflow: WorkflowSchema,
    operatorId?: string,
    isTestMode?: boolean,
  ) {
    if (!workflow.configurations) {
      throw new NotFoundException('The configuration of workflow is empty.');
    }

    if (isTestMode) {
      const executeLog = this.webhookLogService.createExecuteLog({
        orgName,
        operatorId,
        workflowName: workflow.name,
        executedConfigurations: workflow.configurations,
        mode: 'express',
      });

      return executeLog;
    }

    return;
  }

  private validateBody(workflow: WorkflowSchema, body: unknown) {
    if (!workflow.validations) {
      throw new BadRequestException(
        `The specified workflow did not set validations, please set up before you request. The workflow name is ${workflow.name}.`,
      );
    }

    const result = validateWorkflowInput(body);

    if (!result) {
      const message =
        validateWorkflowInput?.errors
          ?.map((error) => error.message)
          ?.join(', ') || '';
      throw new BadRequestException(`validation error: ${message}`);
    }
  }
}
