import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

import { PlayerContainer, PlayerSchema } from '@shukun/schema';

import { playerSchemaValidator } from '@shukun/validator';

import { PlayerGeneratorOptions } from './player-generator.interface';

export class PlayerGenerator {
  async generate(options: PlayerGeneratorOptions) {
    const { inputPath, disabledValidation } = options;

    const players = await this.readEntry(inputPath, 'players');

    for (const [playerName, player] of Object.entries(players)) {
      const containers = await this.readContainers(
        inputPath,
        'players',
        playerName,
      );
      player.containers = containers;

      if (!disabledValidation) {
        playerSchemaValidator.validate(player);
      }
    }

    return this.stringify({ players });
  }

  private async readEntry(
    inputPath: string,
    folderName: string,
  ): Promise<Record<string, PlayerSchema>> {
    const path = join(inputPath, folderName);
    const files = await readdir(path);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    const players: Record<string, PlayerSchema> = {};

    for (const jsonFile of jsonFiles) {
      const string = await readFile(join(path, jsonFile), {
        encoding: 'utf-8',
      });

      const json = JSON.parse(string);

      delete json.$schema;

      players[this.removeJsonExtension(jsonFile)] = json;
    }

    return players;
  }

  private async readContainers(
    inputPath: string,
    folderName: string,
    entryName: string,
  ): Promise<Record<string, PlayerContainer>> {
    const path = join(inputPath, folderName, entryName);
    const files = await readdir(path);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    const containers: Record<string, PlayerContainer> = {};

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
    players: Record<string, PlayerSchema>;
  }): Promise<string> {
    const text = JSON.stringify(lowCode, null, 4);

    return text;
  }

  private removeJsonExtension(fileName: string) {
    return fileName.substring(0, fileName.length - '.json'.length);
  }
}
