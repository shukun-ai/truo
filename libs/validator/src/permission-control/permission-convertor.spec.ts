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

  it('source:orders:query', () => {
    const output = new PermissionConvertor().parse('source:orders:query');
    const expected: PermissionNodes = {
      type: 'source',
      name: 'orders',
      action: 'query',
      recordMode: 'any',
      attributeMode: 'allow',
      reverseAttributes: [],
    };
    expect(output).toEqual(expected);
  });

  it('source:orders:query:::name', () => {
    const output = new PermissionConvertor().parse(
      'source:orders:query:::name',
    );
    const expected: PermissionNodes = {
      type: 'source',
      name: 'orders',
      action: 'query',
      recordMode: 'any',
      attributeMode: 'allow',
      reverseAttributes: ['name'],
    };
    expect(output).toEqual(expected);
  });

  it('source:orders:query:any:allow:name', () => {
    const output = new PermissionConvertor().parse(
      'source:orders:query:any:allow:name',
    );
    const expected: PermissionNodes = {
      type: 'source',
      name: 'orders',
      action: 'query',
      recordMode: 'any',
      attributeMode: 'allow',
      reverseAttributes: ['name'],
    };
    expect(output).toEqual(expected);
  });

  it('source:orders:query:own', () => {
    const output = new PermissionConvertor().parse('source:orders:query:own');
    const expected: PermissionNodes = {
      type: 'source',
      name: 'orders',
      action: 'query',
      recordMode: 'own',
      attributeMode: 'allow',
      reverseAttributes: [],
    };
    expect(output).toEqual(expected);
  });

  it('source:orders:query:own:deny:age', () => {
    const output = new PermissionConvertor().parse(
      'source:orders:query:own:deny:age',
    );
    const expected: PermissionNodes = {
      type: 'source',
      name: 'orders',
      action: 'query',
      recordMode: 'own',
      attributeMode: 'deny',
      reverseAttributes: ['age'],
    };
    expect(output).toEqual(expected);
  });

  it('source:orders:query:own:deny:age', () => {
    expect(() =>
      new PermissionConvertor().parse('source:orders:query:own:deny:$age'),
    ).toThrow(
      new TypeException(
        'The attribute is not match electron name: {{attribute}}',
        { attribute: '$age' },
      ),
    );
  });

  it('if source:orders:query:only, throw error.', () => {
    expect(() =>
      new PermissionConvertor().parse('source:orders:query:only'),
    ).toThrow(
      new TypeException('Only support all or own: {{recordMode}}', {
        recordMode: 'only',
      }),
    );
  });

  it('if source:orders:query::filter, throw error.', () => {
    expect(() =>
      new PermissionConvertor().parse('source:orders:query::filter'),
    ).toThrow(
      new TypeException('Only support allow or deny: {{attributeMode}}', {
        attributeMode: 'filter',
      }),
    );
  });
});
