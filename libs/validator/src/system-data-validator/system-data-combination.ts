import {
  ApplicationSchema,
  MetadataSchema,
  MetadataElectron,
  applicationSeedData,
} from '@shukun/schema';

/**
 * @deprecated
 */
export class SystemDataCombination {
  public combineApplicationLowCode(
    current: ApplicationSchema,
  ): ApplicationSchema {
    return {
      ...current,
      metadata: current.metadata
        ? this.mergeMetadata(
            current.metadata,
            applicationSeedData.metadata || [],
          )
        : undefined,
      views: current.views
        ? this.mergeNameArray(current.views, applicationSeedData.views || [])
        : undefined,
      roles: current.roles
        ? this.mergeNameArray(current.roles, applicationSeedData.roles || [])
        : undefined,
    };
  }

  private mergeMetadata(
    current: MetadataSchema[],
    dependency: MetadataSchema[],
  ) {
    const used: MetadataSchema[] = current.map((currentAtom) => {
      const electrons = currentAtom.electrons;

      const unusedElectrons = this.getUnusedElectrons(
        electrons,
        currentAtom.name,
        dependency,
      );

      return {
        ...currentAtom,
        electrons: [...electrons, ...unusedElectrons],
      };
    });

    const usedAtomNames = used.map((atom) => atom.name);

    const unused = dependency.filter(
      (dependencyAtom) => !usedAtomNames.includes(dependencyAtom.name),
    );

    return [...used, ...unused];
  }

  private getUnusedElectrons(
    usedElectrons: MetadataElectron[],
    atomName: string,
    dependency: MetadataSchema[],
  ): MetadataElectron[] {
    const dependencyAtom = dependency.find((atom) => atom.name === atomName);

    const usedElectronNames = usedElectrons.map((electron) => electron.name);

    const result = dependencyAtom?.electrons.filter(
      (dependencyElectron) =>
        !usedElectronNames.includes(dependencyElectron.name),
    );

    return result || [];
  }

  private mergeNameArray<Schema extends { name: string }>(
    current: Schema[],
    dependency: Schema[],
  ): Schema[] {
    const usedNames = current.map((item) => item.name);

    const unused = dependency.filter(
      (dependencyItem) => !usedNames.includes(dependencyItem.name),
    );

    return [...current, ...unused];
  }
}
