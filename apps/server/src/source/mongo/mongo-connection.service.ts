import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import Mongoose, { Connection, connect } from 'mongoose';

import { OrgService } from '../../core/org.service';

@Injectable()
export class MongoConnectionService implements OnApplicationShutdown {
  private clients = new Map<string, typeof Mongoose>();

  constructor(private readonly orgService: OrgService) {}

  async onApplicationShutdown() {
    for (const [key, client] of this.clients.entries()) {
      await client?.disconnect();
      this.clients.delete(key);
    }
  }

  async getClient(orgName: string): Promise<typeof Mongoose> {
    const client = this.clients.get(orgName);

    if (client) {
      return client;
    }

    const newClient = await this.createClient(orgName);
    this.clients.set(orgName, newClient);
    return newClient;
  }

  async createClient(orgName: string): Promise<typeof Mongoose> {
    const uri = await this.orgService.getDatabase(orgName);

    const client = await connect(uri, {
      autoCreate: true,
    });

    return client;
  }

  async getConnection(orgName: string): Promise<Connection> {
    const client = await this.getClient(orgName);
    return client.connection;
  }
}
