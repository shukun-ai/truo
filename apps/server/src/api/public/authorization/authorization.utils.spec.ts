import { BadRequestException } from '@nestjs/common';

import { getResourceNodes } from './authorization.utils';

describe('authorization.utils', () => {
  it('getResourceNodes', () => {
    const uri = `daily-build.shukun.local/apis/v1/source/shukun/vehicles?sort=&select=number,title,enabled,area,_id&count=true&filter={"title": "A78787"}`;
    const output = getResourceNodes('GET', uri);
    expect(output).toEqual({
      method: 'GET',
      resourceType: 'source',
      orgName: 'shukun',
      resourceName: 'vehicles',
      resourceId: undefined,
    });
  });

  it('should throw BadRequestException for invalid method', () => {
    const uri =
      'daily-build.shukun.local/apis/v1/source/shukun/vehicles?sort=&select=number,title,enabled,area,_id&count=true&filter={"title": "A78787"}';
    expect(() => getResourceNodes('OPTIONS', uri)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException for invalid resource type', () => {
    const uri =
      'daily-build.shukun.local/apis/v1/invalid-type/shukun/vehicles?sort=&select=number,title,enabled,area,_id&count=true&filter={"title": "A78787"}';
    expect(() => getResourceNodes('GET', uri)).toThrow(BadRequestException);
  });

  it('should return the correct resource nodes', () => {
    const uri =
      'daily-build.shukun.local/apis/v1/source/shukun/vehicles?sort=&select=number,title,enabled,area,_id&count=true&filter={"title": "A78787"}';
    const output = getResourceNodes('GET', uri);
    expect(output).toEqual({
      method: 'GET',
      resourceType: 'source',
      orgName: 'shukun',
      resourceName: 'vehicles',
      resourceId: undefined,
      resourceFunction: undefined,
    });
  });
});
