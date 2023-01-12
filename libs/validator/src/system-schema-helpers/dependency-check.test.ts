import {
  MetadataFieldType,
  ViewType,
  applicationSeedData,
} from '@shukun/schema';

import { SystemDataValidator } from './dependency-check';

describe('dependency-check', () => {
  it('return true, current electrons is more than dependency electrons.', () => {
    const systemDataValidator = new SystemDataValidator();
    const output = systemDataValidator.checkElectrons(
      'mockAtomName',
      [
        {
          name: 'test',
          label: 'Test Other Name',
          fieldType: MetadataFieldType.Boolean,
          isRequired: false,
        },
        {
          name: 'test2',
          label: 'Test Other Name',
          fieldType: MetadataFieldType.Boolean,
          isRequired: false,
        },
      ],
      [
        {
          name: 'test',
          label: 'Test Other Name',
          fieldType: MetadataFieldType.Boolean,
          isRequired: false,
        },
      ],
    );
    expect(output).toEqual(true);
  });

  it('return false, current electrons is more than dependency electrons.', () => {
    const systemDataValidator = new SystemDataValidator();
    const output = systemDataValidator.checkElectrons(
      'mockAtomName',
      [
        {
          name: 'test',
          label: 'Test Other Name',
          fieldType: MetadataFieldType.Boolean,
          isRequired: false,
        },
      ],
      [
        {
          name: 'test',
          label: 'Test Other Name',
          fieldType: MetadataFieldType.Boolean,
          isRequired: false,
        },
        {
          name: 'test2',
          label: 'Test Other Name',
          fieldType: MetadataFieldType.Boolean,
          isRequired: false,
        },
      ],
    );
    expect(output).toEqual(false);
  });

  it("return true, if views' name label and type are same.", () => {
    const systemDataValidator = new SystemDataValidator();
    const output = systemDataValidator.checkViews(
      [
        {
          name: 'view',
          label: 'View',
          type: ViewType.Simple,
          isVisible: true,
          priority: 1000,
        },
      ],
      [
        {
          name: 'view',
          label: 'View',
          type: ViewType.Simple,
          isVisible: false,
          priority: 1200,
        },
      ],
    );
    expect(output).toEqual(true);
  });

  it("return true, if roles' name is same.", () => {
    const systemDataValidator = new SystemDataValidator();
    const output = systemDataValidator.checkRoles(
      [
        {
          name: 'owner',
          label: 'Owner',
          permissions: [],
        },
      ],
      [
        {
          name: 'owner',
          label: 'Owner',
          permissions: [],
        },
      ],
    );
    expect(output).toEqual(true);
  });

  it('checkInitialApplicationData', () => {
    const systemDataValidator = new SystemDataValidator();
    const output = systemDataValidator.check(applicationSeedData);
    expect(output).toEqual(true);
  });
});
