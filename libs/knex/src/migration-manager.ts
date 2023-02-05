import { TypeException } from '@shukun/exception';
import { IMigrationManager, MigrationManagerContext } from '@shukun/schema';

import { ConnectionBuilder } from './connection/connection-builder';

/**
 * @remark
 *
 * This class is used for testing.
 * Don't use it in production, you should clean database manually for database security.
 */
export class MigrationManager implements IMigrationManager {
  public async createDatabase(context: MigrationManagerContext): Promise<void> {
    switch (context.connection.type) {
      case 'postgres':
        return await this.createPostgresDatabase(context);
      case 'oracleDB':
        return await this.createOracleDatabase();
      default:
        throw new TypeException('We did not support this DB type: {{type}}.', {
          type: context.connection.type,
        });
    }
  }

  public async dropDatabase(context: MigrationManagerContext): Promise<void> {
    switch (context.connection.type) {
      case 'postgres':
        return await this.dropPostgresDatabase(context);
      case 'oracleDB':
        return await this.dropOracleDatabase();
      default:
        throw new TypeException('We did not support this DB type: {{type}}.', {
          type: context.connection.type,
        });
    }
  }

  private async createPostgresDatabase(
    context: MigrationManagerContext,
  ): Promise<void> {
    const connectionBuilder = new ConnectionBuilder();
    const client = await connectionBuilder.createClient({
      ...context.connection,
      database: 'postgres',
    });

    await client.raw(`CREATE DATABASE ${context.connection.database}`);
    await client.destroy();
  }

  private async dropPostgresDatabase(
    context: MigrationManagerContext,
  ): Promise<void> {
    const connectionBuilder = new ConnectionBuilder();
    const client = await connectionBuilder.createClient({
      ...context.connection,
      database: 'postgres',
    });

    await client.raw(
      `DROP DATABASE IF EXISTS ${context.connection.database} WITH (FORCE)`,
    );
    await client.destroy();
  }

  private async createOracleDatabase(): Promise<void> {
    throw new Error('The createOracleDatabase did not implemented.');
  }

  private async dropOracleDatabase(): Promise<void> {
    throw new Error('The dropOracleDatabase did not implemented.');
  }
}
