import playerData from './player.test.json';
import { playerSchemaValidator } from './validate-player-schema';

describe('player format check.', () => {
  it('playerSchemaValidator', () => {
    playerSchemaValidator.validate(playerData);
  });
});
