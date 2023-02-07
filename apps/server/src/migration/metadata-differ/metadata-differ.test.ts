import { MigrationMetadataMap } from '@shukun/schema';

import { MetadataDiffer } from './metadata-differ';

describe('Differ', () => {
  describe('getDetail', () => {
    it('should return added electron, then left is empty, right is a new electron', () => {
      const left: MigrationMetadataMap = {};
      const right: MigrationMetadataMap = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: true,
          },
        },
      };
      const differences = new MetadataDiffer().getDetail(left, right);
      expect(differences).toEqual({
        added: {
          devices: {
            number: {
              fieldType: 'Text',
              isRequired: true,
              label: 'number',
              name: 'number',
            },
          },
        },
        updated: {},
        deleted: {},
      });
    });

    it('should return updated electron, when left is a electron, right update electron', () => {
      const left: MigrationMetadataMap = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: true,
          },
        },
      };
      const right: MigrationMetadataMap = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: false,
          },
        },
      };
      const differences = new MetadataDiffer().getDetail(left, right);
      expect(differences).toEqual({
        added: {},
        updated: {
          devices: {
            number: {
              name: 'number',
              label: 'number',
              fieldType: 'Text',
              isRequired: false,
            },
          },
        },
        deleted: {},
      });
    });

    it('should return deleted atom, when left is a electron, right is empty', () => {
      const left: MigrationMetadataMap = {
        devices: {
          number: {
            name: 'number',
            label: 'number',
            fieldType: 'Text',
            isRequired: true,
          },
        },
      };
      const right: MigrationMetadataMap = {};
      const differences = new MetadataDiffer().getDetail(left, right);
      expect(differences).toEqual({
        added: {},
        updated: {},
        deleted: {
          devices: {
            number: {
              name: 'number',
              label: 'number',
              fieldType: 'Text',
              isRequired: true,
            },
          },
        },
      });
    });
  });

  describe('Complex and reverse test', () => {
    const left: MigrationMetadataMap = {
      devices: {
        number: {
          name: 'number',
          label: 'number',
          fieldType: 'Text',
          isRequired: true,
        },
        type: {
          name: 'type',
          label: 'type',
          fieldType: 'Text',
          isRequired: true,
        },
      },
      community: {
        name: {
          name: 'name',
          label: 'name',
          fieldType: 'Text',
          isRequired: true,
        },
      },
    };
    const right: MigrationMetadataMap = {
      airports: {
        code: {
          name: 'code',
          label: 'code',
          fieldType: 'Text',
          isRequired: true,
        },
      },
      devices: {
        number: {
          name: 'number',
          label: 'number',
          fieldType: 'Text',
          isRequired: false,
          isUnique: true,
          isIndexed: true,
        },
        title: {
          name: 'title',
          label: 'title',
          fieldType: 'Text',
          isRequired: false,
        },
      },
    };

    it('should return difference, when complex comparison', () => {
      const differences = new MetadataDiffer().getDetail(left, right);
      expect(differences).toEqual({
        added: {
          airports: {
            code: {
              name: 'code',
              label: 'code',
              fieldType: 'Text',
              isRequired: true,
            },
          },
        },
        updated: {
          devices: {
            number: {
              name: 'number',
              label: 'number',
              fieldType: 'Text',
              isRequired: false,
              isUnique: true,
              isIndexed: true,
            },
            title: {
              name: 'title',
              label: 'title',
              fieldType: 'Text',
              isRequired: false,
            },
          },
        },
        deleted: {
          community: {
            name: {
              name: 'name',
              label: 'name',
              fieldType: 'Text',
              isRequired: true,
            },
          },
        },
      });
    });

    it('should return difference, when complex reversed comparison', () => {
      const differences = new MetadataDiffer().getDetail(right, left);
      expect(differences).toEqual({
        added: {
          community: {
            name: {
              name: 'name',
              label: 'name',
              fieldType: 'Text',
              isRequired: true,
            },
          },
        },
        updated: {
          devices: {
            number: {
              name: 'number',
              label: 'number',
              fieldType: 'Text',
              isRequired: true,
            },
            type: {
              name: 'type',
              label: 'type',
              fieldType: 'Text',
              isRequired: true,
            },
          },
        },
        deleted: {
          airports: {
            code: {
              name: 'code',
              label: 'code',
              fieldType: 'Text',
              isRequired: true,
            },
          },
        },
      });
    });
  });
});
