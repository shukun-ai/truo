import { CodebaseService } from './codebase.service';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let roleService: RoleService;
  let codebaseService: CodebaseService;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    codebaseService = new (CodebaseService as any)();
    roleService = new RoleService(codebaseService);
  });

  describe('findAll', () => {
    it('should return an empty array if no roles are found', async () => {
      // Arrange
      const orgName = 'exampleOrg';
      jest
        .spyOn(codebaseService, 'findByOrgName')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockResolvedValueOnce(undefined as any);

      // Act
      const result = await roleService.findAll(orgName);

      // Assert
      expect(result).toEqual([]);
      expect(codebaseService.findByOrgName).toHaveBeenCalledWith(orgName);
    });

    it('should return the roles of the application', async () => {
      // Arrange
      const orgName = 'exampleOrg';
      const roles = [{ name: 'role1' }, { name: 'role2' }];
      jest
        .spyOn(codebaseService, 'findByOrgName')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockResolvedValueOnce({ roles } as any);

      // Act
      const result = await roleService.findAll(orgName);

      // Assert
      expect(result).toEqual(roles);
      expect(codebaseService.findByOrgName).toHaveBeenCalledWith(orgName);
    });
  });
});
