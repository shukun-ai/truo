import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Connection, createConnection } from 'mongoose';

import { OrgService } from '../../core/org.service';

@Injectable()
export class MongoConnectionService implements OnApplicationShutdown {
  private connections = new Map<string, Connection>();

  constructor(private readonly orgService: OrgService) {}

  async onApplicationShutdown() {
    for (const [key, client] of this.connections.entries()) {
      await client?.destroy();
      this.connections.delete(key);
    }
  }

  async getConnection(orgName: string): Promise<Connection> {
    const connection = this.connections.get(orgName);
    if (connection) {
      return connection;
    }
    const newClient = await this.createClient(orgName);
    this.connections.set(orgName, newClient);
    return newClient;
  }

  async createClient(orgName: string): Promise<Connection> {
    const { uri, minPoolSize, maxPoolSize } = await this.orgService.getDatabase(
      orgName,
    );
    const connection = await createConnection(uri, {
      autoCreate: true,
      minPoolSize,
      maxPoolSize,
    }).asPromise();
    return connection;
  }
}
