import {
  ApplicationSchema,
  MetadataElectron,
  MetadataSchema,
  ViewSchema,
  RoleSchema,
  applicationSeedData,
} from '@shukun/schema';

export class SystemDataValidator {
  errorMessage: string[] = [];

  getErrors() {
    return this.errorMessage.length === 0 ? null : this.errorMessage;
  }

  check(application: ApplicationSchema): boolean {
    const dependencyApplication = applicationSeedData;

    if (
      !this.checkMetadata(application.metadata, dependencyApplication.metadata)
    ) {
      return false;
    }

    if (!this.checkViews(application.views, dependencyApplication.views)) {
      return false;
    }

    if (!this.checkRoles(application.roles, dependencyApplication.roles)) {
      return false;
    }
    return true;
  }

  checkMetadata(
    current: MetadataSchema[] | undefined,
    dependency: MetadataSchema[] | undefined,
  ): boolean {
    if (!current || !dependency) {
      this.errorMessage.push(
        'There are no current or dependency variables passed in metadata.',
      );
      return false;
    }

    return dependency.every((dependencyAtom) => {
      const currentAtom = current.find(
        (item) => item.name === dependencyAtom.name,
      );

      if (!currentAtom) {
        this.errorMessage.push(
          `There are no necessary system metadata that is ${dependencyAtom.name}`,
        );
        return false;
      }

      return this.checkElectrons(
        currentAtom.name,
        currentAtom.electrons,
        dependencyAtom.electrons,
      );
    });
  }

  checkElectrons(
    atomName: string,
    currentElectrons: MetadataElectron[],
    dependencyElectrons: MetadataElectron[],
  ): boolean {
    return dependencyElectrons.every((dependencyElectron) => {
      const foundElectron = currentElectrons.find((item) => {
        return (
          item.name === dependencyElectron.name &&
          item.fieldType === dependencyElectron.fieldType &&
          item.isRequired === dependencyElectron.isRequired
        );
      });

      if (!foundElectron) {
        this.errorMessage.push(
          `There no necessary system electron that is ${dependencyElectron.name} from ${atomName}. The name, fieldType and isRequired should be equal with system internal structure. These values are name: ${dependencyElectron.name}, fieldType: ${dependencyElectron.fieldType} and isRequired: ${dependencyElectron.isRequired}.`,
        );
        return false;
      }

      return true;
    });
  }

  checkViews(
    current: ViewSchema[] | undefined,
    dependency: ViewSchema[] | undefined,
  ): boolean {
    if (!current || !dependency) {
      this.errorMessage.push(
        'There are no current or dependency variables passed in views.',
      );
      return false;
    }

    return dependency.every((dependencyView) => {
      const foundView = current.find((item) => {
        return (
          item.name === dependencyView.name &&
          item.type === dependencyView.type &&
          item.atomName === dependencyView.atomName
        );
      });

      if (!foundView) {
        this.errorMessage.push(
          `There no necessary system view that is ${dependencyView.name}. The name, type and atomName should be equal with system internal structure. These values are name: ${dependencyView.name}, type: ${dependencyView.type} and atomName: ${dependencyView.atomName}.`,
        );
        return false;
      }

      return true;
    });
  }

  checkRoles(
    current: RoleSchema[] | undefined,
    dependency: RoleSchema[] | undefined,
  ): boolean {
    if (!current || !dependency) {
      this.errorMessage.push(
        'There are no current or dependency variables roles.',
      );
      return false;
    }

    return dependency.every((dependencyRole) => {
      const foundRole = current.find((item) => {
        return item.name === dependencyRole.name;
      });

      if (!foundRole) {
        this.errorMessage.push(
          `There no necessary system role that is ${dependencyRole.name}.`,
        );
        return false;
      }

      return true;
    });
  }
}
