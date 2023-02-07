import { DataSourceConnection } from '@shukun/schema';

export const buildTableName = (
  orgName: string,
  atomName: string,
  dataSourceConnection: DataSourceConnection,
) => {
  const tableName = `${orgName}_${atomName}`;

  if (!dataSourceConnection?.tablePrefix) {
    return tableName;
  } else {
    return `${dataSourceConnection.tablePrefix}${tableName}`;
  }
};
