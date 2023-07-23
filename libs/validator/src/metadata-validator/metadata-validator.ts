import { MetadataElectron, MetadataSchema } from '@shukun/schema';

import { hasProperty } from './has-property';

export const validateMetadatas = (metadatas: MetadataSchema[]) => {
  metadatas.forEach((metadata) => {
    validateElectrons(metadata.electrons);
  });
};

export const validateElectrons = (electrons: MetadataElectron[]) => {
  const ownerElectron = getElectron('owner', electrons);
  hasProperty(ownerElectron, {
    fieldType: 'Owner',
    name: 'owner',
    isRequired: false,
  });

  const createdAtElectron = getElectron('createdAt', electrons);
  hasProperty(createdAtElectron, {
    fieldType: 'DateTime',
    name: 'createdAt',
    isRequired: false,
  });

  const updatedAtElectron = getElectron('updatedAt', electrons);
  hasProperty(updatedAtElectron, {
    fieldType: 'DateTime',
    name: 'updatedAt',
    isRequired: false,
  });
};

const getElectron = (
  electronName: string,
  electrons: MetadataElectron[],
): MetadataElectron => {
  const electron = electrons.find((electron) => electron.name === electronName);
  if (!electron) {
    throw new Error('Did not find electron');
  }
  return electron;
};
