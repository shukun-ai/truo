#!/usr/bin/env node

import { join } from 'path';

import { AxiosAdaptor } from '@shukun/api';
import { Command } from 'commander';
import { z } from 'zod';

import * as packageJson from '../package.json';

import { DeployCodebase } from './deploy/deploy';

const program = new Command();

program.name('skp').version(packageJson.version);

const environmentSchema = z
  .object({
    SKP_BASE_URL: z.string(),
    SKP_ORG_NAME: z.string(),
    SKP_ACCESS_TOKEN: z.string().optional(),
  })
  .transform((value) => ({
    baseUrl: value.SKP_BASE_URL,
    orgName: value.SKP_ORG_NAME,
    accessToken: value.SKP_ACCESS_TOKEN,
  }));

const run = async () => {
  program
    .command('codebase [codebasePath]')
    .description('Upload codebase to SHUKUN Platform Runtime')
    .action((codebasePath: string) => {
      const instance = new DeployCodebase();
      const filepath = join(process.cwd(), codebasePath);
      const params = environmentSchema.parse(process.env);

      const adaptor = new AxiosAdaptor({
        baseUrl: `${params.baseUrl}/apis/v1`,
        onOrgName: () => params.orgName || null,
        onAccessToken: () => params.accessToken || null,
      });

      instance.uploadCodebase(filepath, adaptor);
    });

  program
    .command('data-source [codebasePath]')
    .description('Upload Data Source to SHUKUN Platform Runtime')
    .action((dataSource: string) => {
      const instance = new DeployCodebase();
      const filepath = join(process.cwd(), dataSource);
      const params = environmentSchema.parse(process.env);

      const adaptor = new AxiosAdaptor({
        baseUrl: `${params.baseUrl}/apis/v1`,
        onOrgName: () => params.orgName || null,
        onAccessToken: () => params.accessToken || null,
      });

      instance.uploadDataSource(filepath, adaptor);
    });

  await program.parseAsync(process.argv);
};

run();
