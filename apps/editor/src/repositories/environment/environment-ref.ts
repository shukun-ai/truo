import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { EnvironmentSchema } from '@shukun/schema';

export type EnvironmentEntity = {
  id: string;
  environmentName: string;
} & EnvironmentSchema;

const { environmentEntitiesRef, withEnvironmentEntities } =
  entitiesPropsFactory('environment');

export const withEnvironment = () => {
  return withEnvironmentEntities<EnvironmentEntity>();
};

export const environmentRef = environmentEntitiesRef;

export const createEnvironmentEntityId = (
  environmentName: string,
): `${string}` => {
  return `${environmentName}`;
};

export const getEnvironment = (
  entity: EnvironmentEntity,
): EnvironmentSchema => {
  const { id, environmentName, ...environment } = entity;
  return { ...environment };
};
