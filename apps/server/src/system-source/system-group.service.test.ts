import { SystemGroupModel } from '@shukun/schema';

import { SourceService } from '../source/source.service';

import { SystemGroupService } from './system-group.service';

describe('SystemGroupService', () => {
  let systemGroupService: SystemGroupService;
  let systemGroupSourceService: SourceService<SystemGroupModel>;

  beforeEach(() => {
    systemGroupSourceService = {
      query: jest.fn(),
    } as any;
    systemGroupService = new SystemGroupService(systemGroupSourceService);
  });

  describe('findAll', () => {
    it('should call systemGroupSourceService.query with the correct parameters', async () => {
      // Arrange
      const orgName = 'exampleOrgName';
      const userId = 'exampleUserId';

      // Act
      await systemGroupService.findAll(orgName, userId);

      // Assert
      expect(systemGroupSourceService.query).toHaveBeenCalledWith(
        orgName,
        'system__groups',
        {
          filter: { users: userId },
        },
      );
    });

    it('should return the result of systemGroupSourceService.query', async () => {
      // Arrange
      const orgName = 'exampleOrgName';
      const userId = 'exampleUserId';
      const expectedResult = ['group1', 'group2'];
      (systemGroupSourceService.query as any).mockResolvedValueOnce(
        expectedResult as any,
      );

      // Act
      const result = await systemGroupService.findAll(orgName, userId);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
