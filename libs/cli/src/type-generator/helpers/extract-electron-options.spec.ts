import { MetadataFieldType, MetadataSchema } from '@shukun/schema';

import { extractElectronOptions } from './extract-electron-options';

it('', () => {
  const atom: MetadataSchema = {
    name: 'atom',
    label: 'atom',
    electrons: [
      {
        name: 'test',
        label: 'test',
        isRequired: false,
        fieldType: MetadataFieldType.SingleSelect,
        options: [
          {
            key: 'test1',
            label: 'test1',
          },
          {
            key: 'test2',
            label: 'test2',
          },
        ],
      },
      {
        name: 'test2',
        label: 'test2',
        isRequired: false,
        fieldType: MetadataFieldType.SingleSelect,
        options: [
          {
            key: 'test1',
            label: 'test1',
          },
          {
            key: 'test2',
            label: 'test2',
          },
        ],
      },
    ],
  };
  const output = extractElectronOptions(atom);
  expect(output).toEqual(
    `export const AtomTestOptions = {test1: "test1", test2: "test2", };export const AtomTest2Options = {test1: "test1", test2: "test2", };`,
  );
});
