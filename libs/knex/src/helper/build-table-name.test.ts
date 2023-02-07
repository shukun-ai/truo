import { DataSourceConnection } from '@shukun/schema';

import { buildTableName } from './build-table-name';

describe('buildTableName', () => {
  it('should return shukun_devices', () => {
    const connection: DataSourceConnection = {
      type: 'default',
      host: '',
      database: '',
      metadata: [],
    };
    const tableName = buildTableName('shukun', 'devices', connection);
    expect(tableName).toEqual('shukun_devices');
  });

  it('should return prefix_shukun_devices', () => {
    const connection: DataSourceConnection = {
      type: 'default',
      host: '',
      database: '',
      metadata: [],
      tablePrefix: 'prefix_',
    };
    const tableName = buildTableName('shukun', 'devices', connection);
    expect(tableName).toEqual('prefix_shukun_devices');
  });
});
