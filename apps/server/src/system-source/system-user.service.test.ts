import { SourceService } from '../source/source.service';
import { SystemUserModel } from '../util/schema/models/system-users';

import { SystemUserService } from './system-user.service';

describe('SystemUserService', () => {
  let systemUserService: SystemUserService;
  let systemUserSourceService: SourceService<SystemUserModel>;

  beforeEach(() => {
    systemUserSourceService = {
      findOne: jest.fn(),
    } as any;
    systemUserService = new SystemUserService(systemUserSourceService);
  });

  describe('findOne', () => {
    it('should call systemUserSourceService.findOne with the correct parameters', async () => {
      // Arrange
      const orgName = 'exampleOrgName';
      const userId = 'exampleUserId';

      // Act
      await systemUserService.findOne(orgName, userId);

      // Assert
      expect(systemUserSourceService.findOne).toHaveBeenCalledWith(
        orgName,
        'system__users',
        {
          filter: { _id: userId },
        },
      );
    });

    it('should return the result of systemUserSourceService.findOne', async () => {
      // Arrange
      const orgName = 'exampleOrgName';
      const userId = 'exampleUserId';
      const expectedResult = { name: 'John Doe' };
      (systemUserSourceService.findOne as any).mockResolvedValueOnce(
        expectedResult as any,
      );

      // Act
      const result = await systemUserService.findOne(orgName, userId);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
