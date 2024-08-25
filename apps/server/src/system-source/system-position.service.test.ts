import { SystemPositionModel } from '@shukun/schema';

import { SourceService } from '../source/source.service';

import { SystemPositionService } from './system-position.service';

describe('SystemPositionService', () => {
  let systemPositionService: SystemPositionService;
  let systemPositionSourceService: SourceService<SystemPositionModel>;

  beforeEach(() => {
    systemPositionSourceService = {
      query: jest.fn(),
    } as any;
    systemPositionService = new SystemPositionService(
      systemPositionSourceService,
    );
  });

  describe('findAll', () => {
    it('should call systemPositionSourceService.query with the correct parameters', async () => {
      // Arrange
      const orgName = 'exampleOrgName';
      const userId = 'exampleUserId';

      // Act
      await systemPositionService.findAll(orgName, userId);

      // Assert
      expect(systemPositionSourceService.query).toHaveBeenCalledWith(
        orgName,
        'system__positions',
        {
          filter: { users: userId },
        },
      );
    });

    it('should return the result of systemPositionSourceService.query', async () => {
      // Arrange
      const orgName = 'exampleOrgName';
      const userId = 'exampleUserId';
      const expectedResult = ['position1', 'position2'];
      (systemPositionSourceService.query as any).mockResolvedValueOnce(
        expectedResult as any,
      );

      // Act
      const result = await systemPositionService.findAll(orgName, userId);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
