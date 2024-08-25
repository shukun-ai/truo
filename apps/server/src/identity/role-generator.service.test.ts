import { SystemGroupService } from '../system-source/system-group.service';
import { SystemPositionService } from '../system-source/system-position.service';

import { RoleGeneratorService } from './role-generator.service';

describe('RoleGeneratorService', () => {
  let roleGeneratorService: RoleGeneratorService;
  let systemGroupService: SystemGroupService;
  let systemPositionService: SystemPositionService;

  beforeEach(() => {
    systemGroupService = new (SystemGroupService as any)();
    systemPositionService = new (SystemPositionService as any)();
    roleGeneratorService = new RoleGeneratorService(
      systemGroupService,
      systemPositionService,
    );
  });

  describe('getRoleNames', () => {
    it('should return an empty array if no groups and positions are found', async () => {
      // Arrange
      const orgName = 'exampleOrg';
      const userId = 'exampleUserId';
      jest.spyOn(systemGroupService, 'findAll').mockResolvedValueOnce([]);
      jest.spyOn(systemPositionService, 'findAll').mockResolvedValueOnce([]);

      // Act
      const result = await roleGeneratorService.getRoleNames(orgName, userId);

      // Assert
      expect(result).toEqual([]);
      expect(systemGroupService.findAll).toHaveBeenCalledWith(orgName, userId);
      expect(systemPositionService.findAll).toHaveBeenCalledWith(
        orgName,
        userId,
      );
    });

    it('should return the combined roles from groups and positions', async () => {
      // Arrange
      const orgName = 'exampleOrg';
      const userId = 'exampleUserId';
      const groups = [{ roles: ['role1', 'role2'] }, { roles: ['role3'] }];
      const positions = [{ roles: ['role4'] }, { roles: ['role5', 'role6'] }];
      jest
        .spyOn(systemGroupService, 'findAll')
        .mockResolvedValueOnce(groups as any);
      jest
        .spyOn(systemPositionService, 'findAll')
        .mockResolvedValueOnce(positions as any);

      // Act
      const result = await roleGeneratorService.getRoleNames(orgName, userId);

      // Assert
      expect(result).toEqual([
        'role1',
        'role2',
        'role3',
        'role4',
        'role5',
        'role6',
      ]);
      expect(systemGroupService.findAll).toHaveBeenCalledWith(orgName, userId);
      expect(systemPositionService.findAll).toHaveBeenCalledWith(
        orgName,
        userId,
      );
    });
  });
});
