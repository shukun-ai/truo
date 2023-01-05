import { MetadataElectron } from '@shukun/schema';

export const buildConstraint = (electron: MetadataElectron) => {
  return (
    buildRequired(electron) + buildUnique(electron) + buildIndexed(electron)
  );
};

export const buildUnique = (electron: MetadataElectron) => {
  if (electron.isUnique && !electron.isRequired) {
    throw new Error(
      'When the isUnique set as true, the isRequired and isIndexed must be set as true.',
    );
  }

  if (electron.isUnique && electron.isIndexed) {
    throw new Error(
      'When the isUnique set as true, the isIndexed must be set as false.',
    );
  }

  return electron.isUnique ? '.unique()' : '';
};

export const buildRequired = (electron: MetadataElectron) => {
  return electron.isRequired ? '.notNullable()' : '.nullable()';
};

export const buildIndexed = (electron: MetadataElectron) => {
  return electron.isIndexed ? '.index()' : '';
};
