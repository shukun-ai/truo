import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class SourceMainDbTestService {
  async getConnectivity(dbUri: string) {
    const client = new MongoClient(dbUri);
    try {
      await client.connect();
      await client.close();
      return true;
    } catch (error) {
      return false;
    } finally {
      await client.close();
    }
  }
}
