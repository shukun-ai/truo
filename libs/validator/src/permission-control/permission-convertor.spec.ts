import { TypeException } from '@shukun/exception';

import { PermissionNodes } from './permission-control.type';

import { PermissionConvertor } from './permission-convertor';

describe('PermissionConvertor', () => {
  it('source', () => {
    expect(() => new PermissionConvertor().parse('source')).toThrow(
      new TypeException(
        'Did not find type and name: {{stringPermission}}. Rule: type:name[:action[[(own)]:attributes]].',
        {
          stringPermission: 'source',
        },
      ),
    );
  });

  it('source:orders', () => {
    const output = new PermissionConvertor().parse('source:orders');
    const expected: PermissionNodes = {
      type: 'source',
      name: 'orders',
      action: null,
      recordMode: 'any',
      attributeMode: 'allow',
      reverseAttributes: [],
    };
    expect(output).toEqual(expected);
  });

  it('source:orders:read', () => {
    const output = new PermissionConvertor().parse('source:orders:read');
    const expected: PermissionNodes = {
      type: 'source',
      name: 'orders',
      action: 'read',
      recordMode: 'any',
      attributeMode: 'allow',
      reverseAttributes: [],
    };
    expect(output).toEqual(expected);
  });

  it('source:orders:read:::name', () => {
    const output = new PermissionConvertor().parse('source:orders:read:::name');
    const expected: PermissionNodes = {
      type: 'source',
      name: 'orders',
      action: 'read',
      recordMode: 'any',
      attributeMode: 'allow',
      reverseAttributes: ['name'],
    };
    expect(output).toEqual(expected);
  });

  it('source:orders:read:any:allow:name', () => {
    const output = new PermissionConvertor().parse(
      'source:orders:read:any:allow:name',
    );
    const expected: PermissionNodes = {
      type: 'source',
      name: 'orders',
      action: 'read',
      recordMode: 'any',
      attributeMode: 'allow',
      reverseAttributes: ['name'],
    };
    expect(output).toEqual(expected);
  });

  it('source:orders:read:own', () => {
    const output = new PermissionConvertor().parse('source:orders:read:own');
    const expected: PermissionNodes = {
      type: 'source',
      name: 'orders',
      action: 'read',
      recordMode: 'own',
      attributeMode: 'allow',
      reverseAttributes: [],
    };
    expect(output).toEqual(expected);
  });

  it('source:orders:read:own:deny:age', () => {
    const output = new PermissionConvertor().parse(
      'source:orders:read:own:deny:age',
    );
    const expected: PermissionNodes = {
      type: 'source',
      name: 'orders',
      action: 'read',
      recordMode: 'own',
      attributeMode: 'deny',
      reverseAttributes: ['age'],
    };
    expect(output).toEqual(expected);
  });

  it('source:orders:read:own:deny:age', () => {
    expect(() =>
      new PermissionConvertor().parse('source:orders:read:own:deny:$age'),
    ).toThrow(
      new TypeException(
        'The attribute is not match electron name: {{attribute}}',
        { attribute: '$age' },
      ),
    );
  });

  it('if source:orders:read:only, throw error.', () => {
    expect(() =>
      new PermissionConvertor().parse('source:orders:read:only'),
    ).toThrow(
      new TypeException('Only support all or own: {{recordMode}}', {
        recordMode: 'only',
      }),
    );
  });

  it('if source:orders:read::filter, throw error.', () => {
    expect(() =>
      new PermissionConvertor().parse('source:orders:read::filter'),
    ).toThrow(
      new TypeException('Only support allow or deny: {{attributeMode}}', {
        attributeMode: 'filter',
      }),
    );
  });

  it('if source:orders:metadata, then throw', () => {
    expect(() =>
      new PermissionConvertor().parse('source:orders:metadata'),
    ).toThrow(
      new TypeException(
        'Only support read, create, update, delete for source type, do not support {{name}}',
        {
          name: 'metadata',
        },
      ),
    );
  });
});
