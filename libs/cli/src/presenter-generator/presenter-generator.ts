import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

import { PresenterContainer, PresenterSchema } from '@shukun/schema';

import { presenterSchemaValidator } from '@shukun/validator';

import { PresenterGeneratorOptions } from './presenter-generator.interface';

export class PresenterGenerator {
  async generate(options: PresenterGeneratorOptions) {
    const { inputPath, disabledValidation } = options;

    const presenters = await this.readEntry(inputPath, 'presenters');

    for (const [presenterName, presenter] of Object.entries(presenters)) {
      const containers = await this.readContainers(
        inputPath,
        'presenters',
        presenterName,
      );
      presenter.containers = containers;

      if (!disabledValidation) {
        presenterSchemaValidator.validate(presenter);
      }
    }

    return this.stringify({ presenters });
  }

  private async readEntry(
    inputPath: string,
    folderName: string,
  ): Promise<Record<string, PresenterSchema>> {
    const path = join(inputPath, folderName);
    const files = await readdir(path);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    const presenters: Record<string, PresenterSchema> = {};

    for (const jsonFile of jsonFiles) {
      const string = await readFile(join(path, jsonFile), {
        encoding: 'utf-8',
      });

      const json = JSON.parse(string);

      delete json.$schema;

      presenters[this.removeJsonExtension(jsonFile)] = json;
    }

    return presenters;
  }

  private async readContainers(
    inputPath: string,
    folderName: string,
    entryName: string,
  ): Promise<Record<string, PresenterContainer>> {
    const path = join(inputPath, folderName, entryName);
    const files = await readdir(path);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    const containers: Record<string, PresenterContainer> = {};

    for (const jsonFile of jsonFiles) {
      const string = await readFile(join(path, jsonFile), {
        encoding: 'utf-8',
      });

      const json = JSON.parse(string);

      delete json.$schema;

      containers[this.removeJsonExtension(jsonFile)] = json;
    }

    return containers;
  }

  private async stringify(lowCode: {
    presenters: Record<string, PresenterSchema>;
  }): Promise<string> {
    const text = JSON.stringify(lowCode, null, 4);

    return text;
  }

  private removeJsonExtension(fileName: string) {
    return fileName.substring(0, fileName.length - '.json'.length);
  }
}
