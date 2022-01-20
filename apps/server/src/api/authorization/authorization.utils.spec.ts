import { getResourceNodes } from './authorization.utils';

describe('authorization.utils', () => {
  it('getResourceNodes', () => {
    const uri = `daily-build.shukun.local/apis/v1/source/pactl/vehicles?sort=&select=number,title,enabled,area,_id&count=true&filter={"title": "A78787"}`;
    const output = getResourceNodes('GET', uri);
    expect(output).toEqual({
      method: 'GET',
      resourceType: 'source',
      orgName: 'pactl',
      resourceName: 'vehicles',
      resourceId: undefined,
    });
  });
});
