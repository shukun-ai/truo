import { entitiesPropsFactory } from '@ngneat/elf-entities';
import { MetadataReviseSchema } from '@shukun/schema';

export type MetadataEntity = {
  id: string;
  metadataName: string;
} & MetadataReviseSchema;

const { metadataEntitiesRef, withMetadataEntities } =
  entitiesPropsFactory('metadata');

export const withMetadata = () => {
  return withMetadataEntities<MetadataEntity>();
};

export const metadataRef = metadataEntitiesRef;

export const createMetadataEntityId = (metadataName: string): `${string}` => {
  return `${metadataName}`;
};

export const getMetadata = (entity: MetadataEntity): MetadataReviseSchema => {
  const { id, metadataName, ...metadata } = entity;
  return { ...metadata };
};
