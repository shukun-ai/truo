import { DataSourceConnection } from '@shukun/schema';

export const buildClientIdentifier = (
  dataSourceConnection: DataSourceConnection,
) => {
  const { type, host, port, username, password, database } =
    dataSourceConnection;

  // The formula: type://[username[:password]@][host][:port][/database]
  const typeString = `${type}://`;
  const hostString = host;
  const passwordString = password ? `:${password}` : '';
  const authString = username ? `${username}${passwordString}@` : '';
  const portString = port ? `:${port}` : '';
  const databaseString = database ? `/${database}` : '';

  return `${typeString}${authString}${hostString}${portString}${databaseString}`;
};
