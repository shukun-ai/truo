import { isRolePermission } from './is-role-permission';

describe('isQueryFilter', () => {
  it('if value is correct string permission.', () => {
    expect(isRolePermission('source:orders')).toEqual(true);
  });

  it('if value is wrong string permission.', () => {
    expect(isRolePermission('source')).toEqual(false);
  });

  it('if value is not a string,', () => {
    expect(isRolePermission(10)).toEqual(false);
  });
});
