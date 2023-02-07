import {
  MetadataElectron,
  MetadataFieldType,
  MetadataSchema,
} from '@shukun/schema';

import { extractAtom, listElectronOptionKey } from './extract-atom';

describe('', () => {
  it('', () => {
    const atom: MetadataSchema = {
      name: 'areas',
      label: '机动车所属区域',
      electrons: [
        {
          name: 'title',
          label: '区域名称',
          fieldType: MetadataFieldType.Text,
          isRequired: true,
        },
        {
          name: 'storage',
          label: '交接点',
          fieldType: MetadataFieldType.ManyToOne,
          isRequired: true,
          referenceTo: 'storages',
          foreignName: 'title',
        },
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
          isRequired: true,
          fieldType: MetadataFieldType.MultiSelect,
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

    const output = extractAtom(atom);
    expect(output).toEqual(
      'export interface AreasModel {_id: IDString; owner?: IDString; createdAt?: DateTimeIsoString; updatedAt?: DateTimeIsoString; title: string; storage: IDString; test?: "test1"|"test2"; test2: ("test1"|"test2")[]; };',
    );
  });

  it('', () => {
    const electron: MetadataElectron = {
      name: 'test',
      label: 'test',
      isRequired: true,
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
    };
    const output = listElectronOptionKey(electron);
    expect(output).toEqual(`"test1"|"test2"`);
  });
});
