import { initialApplication } from "../../json-exports";
import {
  ApplicationSchema,
  MetadataSchema,
  MetadataElectron,
} from "../../types/application";

export function mergeDependencies(
  current: ApplicationSchema
): ApplicationSchema {
  return {
    ...current,
    metadata: current.metadata
      ? mergeMetadata(current.metadata, initialApplication.metadata || [])
      : undefined,
    views: current.views
      ? mergeNameArray(current.views, initialApplication.views || [])
      : undefined,
    roles: current.roles
      ? mergeNameArray(current.roles, initialApplication.roles || [])
      : undefined,
  };
}

export function mergeMetadata(
  current: MetadataSchema[],
  dependency: MetadataSchema[]
) {
  const used: MetadataSchema[] = current.map((currentAtom) => {
    const electrons = currentAtom.electrons;

    const unusedElectrons = getUnusedElectrons(
      electrons,
      currentAtom.name,
      dependency
    );

    return {
      ...currentAtom,
      electrons: [...electrons, ...unusedElectrons],
    };
  });

  const usedAtomNames = used.map((atom) => atom.name);

  const unused = dependency.filter(
    (dependencyAtom) => !usedAtomNames.includes(dependencyAtom.name)
  );

  return [...used, ...unused];
}

function getUnusedElectrons(
  usedElectrons: MetadataElectron[],
  atomName: string,
  dependency: MetadataSchema[]
): MetadataElectron[] {
  const dependencyAtom = dependency.find((atom) => atom.name === atomName);

  const usedElectronNames = usedElectrons.map((electron) => electron.name);

  const result = dependencyAtom?.electrons.filter(
    (dependencyElectron) => !usedElectronNames.includes(dependencyElectron.name)
  );

  return result || [];
}

export function mergeNameArray<Schema extends { name: string }>(
  current: Schema[],
  dependency: Schema[]
): Schema[] {
  const usedNames = current.map((item) => item.name);

  const unused = dependency.filter(
    (dependencyItem) => !usedNames.includes(dependencyItem.name)
  );

  return [...current, ...unused];
}
