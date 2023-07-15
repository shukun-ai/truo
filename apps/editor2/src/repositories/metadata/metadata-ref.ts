import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { MetadataSchema } from '@shukun/schema';

export type MetadataEntity = {
  id: string;
} & MetadataSchema;

const { metadataEntitiesRef, withMetadataEntities } =
  entitiesPropsFactory('metadata');

export const withMetadata = () => {
  return withMetadataEntities<MetadataEntity>();
};

export const metadataRef = metadataEntitiesRef;

export const createMetadataEntityId = (metadataName: string): `${string}` => {
  return `${metadataName}`;
};

export const getMetadata = (entity: MetadataEntity): MetadataSchema => {
  const { id, ...metadata } = entity;
  return { ...metadata };
};
