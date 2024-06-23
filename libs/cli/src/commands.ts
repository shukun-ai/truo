#!/usr/bin/env node

import { join } from 'path';

import { Command } from 'commander';
import { z } from 'zod';

import * as packageJson from '../package.json';

import { DeployCodebase } from './deploy/deploy';

const program = new Command();

program
  .name('skp')
  .version(packageJson.version)
  .option('-c, --config <path>', 'set config path', './deploy.conf');

const deploySchema = z
  .object({
    base_url: z.string(),
    org_name: z.string(),
    access_token: z.string().optional(),
  })
  .transform((value) => ({
    baseUrl: value.base_url,
    orgName: value.org_name,
    accessToken: value.access_token,
  }));

const run = async () => {
  program
    .command('deploy [codebasePath]')
    .description('run setup commands for all envs')
    .requiredOption('-b, --base_url <baseUrl>', 'Endpoint base url')
    .requiredOption('-o, --org_name <orgName>', 'Endpoint org name')
    .option('-a, --access_token <accessToken>', 'Endpoint access token')
    .action((codebasePath, options) => {
      // eslint-disable-next-line no-console
      console.log(codebasePath, options);
      const instance = new DeployCodebase();
      const filepath = join(process.cwd(), codebasePath);
      const params = deploySchema.parse(options);
      instance.run(filepath, params);
    });

  await program.parseAsync(process.argv);
};

run().then(() => {
  // eslint-disable-next-line no-console
  console.log('finish');
});
