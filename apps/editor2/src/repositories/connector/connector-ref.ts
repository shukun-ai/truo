import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { ConnectorSchema } from '@shukun/schema';

export type ConnectorEntity = {
  id: string;
  connectorName: string;
  isEdited: boolean;
} & ConnectorSchema;

const { connectorEntitiesRef, withConnectorEntities } =
  entitiesPropsFactory('connector');

export const withConnector = () => {
  return withConnectorEntities<ConnectorEntity>();
};

export const connectorRef = connectorEntitiesRef;

export const createConnectorEntityId = (connectorName: string): `${string}` => {
  return `${connectorName}`;
};

export const getConnector = (entity: ConnectorEntity): ConnectorSchema => {
  const { id, connectorName, isEdited, ...connector } = entity;
  return { ...connector };
};
