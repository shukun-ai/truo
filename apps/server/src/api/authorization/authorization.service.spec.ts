import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

import { RoleService } from '../../core/role.service';

import { RoleGeneratorService } from '../../identity/role-generator.service';
import { TokenVerifyService } from '../../identity/token-verify.service';
import { SystemUserService } from '../../system-source/system-user.service';

import { AuthorizationService } from './authorization.service';
import {
  anonymousUserToken,
  invalidOrgNameToken,
  mockJwtServiceVerify,
  mockSecurityServiceGetGrantList,
  mockSecurityServiceGetRoleNames,
  mockSecurityServiceGetUser,
  validCfoUserToken,
  validCooUserToken,
  validOwnerUserToken,
} from './authorization.service.test-helper';

describe('AuthorizationService', () => {
  let authorizationService: AuthorizationService;
  let tokenVerifyService: TokenVerifyService;
  let roleGeneratorService: RoleGeneratorService;
  let systemUserService: SystemUserService;
  let roleService: RoleService;

  beforeAll(() => {
    tokenVerifyService = new (jest.fn())();
    tokenVerifyService.parse = mockJwtServiceVerify;
    roleGeneratorService = new (jest.fn())();
    roleGeneratorService.getRoleNames = mockSecurityServiceGetRoleNames;
    systemUserService = new (jest.fn())();
    systemUserService.findOne = mockSecurityServiceGetUser;
    roleService = new (jest.fn())();
    roleService.findAll = mockSecurityServiceGetGrantList;

    authorizationService = new AuthorizationService(
      tokenVerifyService,
      roleGeneratorService,
      systemUserService,
      roleService,
    );
  });

  describe('POST /apis/v1/public/{orgName}/authentication/jwt', () => {
    it('should pass, whatever roles.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/public/shukun/authentication/jwt',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  describe('POST /apis/v1/public/{orgName}/authentication/jwt_encrypt', () => {
    it('should pass, whatever roles.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/public/shukun/authentication/jwt_encrypt',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  describe('GET /apis/v1/public/any/authorization/validate', () => {
    it('should pass, whatever roles.', async () => {
      const output = await authorizationService.validate(
        'GET',
        '/apis/v1/public/any/authorization/validate',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  describe('GET /apis/v1/public/{orgName}/grant-list', () => {
    it('should pass, whatever roles.', async () => {
      const output = await authorizationService.validate(
        'GET',
        '/apis/v1/public/shukun/grant-list',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  describe('GET /apis/v1/public/{orgName}/grant-roles', () => {
    it('should pass, whatever roles.', async () => {
      const output = await authorizationService.validate(
        'GET',
        '/apis/v1/public/shukun/grant-roles',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  describe('GET /apis/v1/public/{orgName}/org', () => {
    it('should pass, whatever roles.', async () => {
      const output = await authorizationService.validate(
        'GET',
        '/apis/v1/public/shukun/org',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  describe('POST /apis/v1/webhook/{orgName}/{workflowName}', () => {
    it('if owner, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/webhook/shukun/workflow_name',
        validOwnerUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if coo, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/webhook/shukun/workflow_name',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if cfo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/webhook/shukun/workflow_name',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('未授权访问该资源。'));
    });

    it('if anonymous, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/webhook/shukun/workflow_name',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new UnauthorizedException('未登录无法访问该资源。'));
    });

    it('if anonymous post workflow_public, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/webhook/shukun/workflow_public',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  describe('GET /apis/v1/view/{orgName}/views', () => {
    it('if owner, then pass.', async () => {
      const output = await authorizationService.validate(
        'GET',
        '/apis/v1/view/shukun/views',
        validOwnerUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if coo, then pass.', async () => {
      const output = await authorizationService.validate(
        'GET',
        '/apis/v1/view/shukun/views',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if cfo, then pass.', async () => {
      const output = await authorizationService.validate(
        'GET',
        '/apis/v1/view/shukun/views',
        validCfoUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if anonymous, then pass.', async () => {
      const output = await authorizationService.validate(
        'GET',
        '/apis/v1/view/shukun/views',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  describe('POST /apis/v1/developer/{orgName}/codebase', () => {
    it('if owner, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/developer/shukun/codebase',
        validOwnerUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if coo, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/developer/shukun/codebase',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if cfo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/developer/shukun/codebase',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('未授权访问该资源。'));
    });

    it('if anonymous metadata orders, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/developer/shukun/codebase',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new UnauthorizedException('未登录无法访问该资源。'));
    });
  });

  describe('POST /apis/v1/source/{orgName}/{atomName}/any/metadata', () => {
    it('if owner, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/metadata',
        validOwnerUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if coo, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/metadata',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if cfo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/metadata',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('未授权访问该资源。'));
    });

    it('if anonymous metadata orders, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/metadata',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new UnauthorizedException('未登录无法访问该资源。'));
    });
  });

  describe('POST /apis/v1/source/{orgName}/{atomName}/any/query', () => {
    it('if owner, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/query',
        validOwnerUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if coo, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/query',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if cfo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/query',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('未授权访问该资源。'));
    });

    it('if cfo has readOwn of payments, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/payments/any/query',
        validCfoUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if anonymous query orders, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/query',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new UnauthorizedException('未登录无法访问该资源。'));
    });

    it('if anonymous has read of products, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/products/any/query',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  describe('POST /apis/v1/source/{orgName}/{atomName}/any/create', () => {
    it('if owner, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/create',
        validOwnerUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if coo, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/create',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if cfo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/create',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('未授权访问该资源。'));
    });

    it('if anonymous query orders, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/create',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new UnauthorizedException('未登录无法访问该资源。'));
    });
  });

  describe('POST /apis/v1/source/{orgName}/{atomName}/any/update', () => {
    it('if owner, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/update',
        validOwnerUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if coo, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/update',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if cfo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/update',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('未授权访问该资源。'));
    });

    it('if cfo has readOwn of payments, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/payments/any/update',
        validCfoUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if anonymous update orders, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/update',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new UnauthorizedException('未登录无法访问该资源。'));
    });

    it('if anonymous has read of products, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/products/any/update',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  describe('POST /apis/v1/source/{orgName}/{atomName}/any/add-to-many', () => {
    it('if owner, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/add-to-many',
        validOwnerUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if coo, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/add-to-many',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if cfo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/add-to-many',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('未授权访问该资源。'));
    });

    it('if anonymous add-to-many orders, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/add-to-many',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new UnauthorizedException('未登录无法访问该资源。'));
    });
  });

  describe('POST /apis/v1/source/{orgName}/{atomName}/any/remove-from-many', () => {
    it('if owner, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/remove-from-many',
        validOwnerUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if coo, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/remove-from-many',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if cfo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/remove-from-many',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('未授权访问该资源。'));
    });

    it('if anonymous remove-from-many orders, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/remove-from-many',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new UnauthorizedException('未登录无法访问该资源。'));
    });
  });

  describe('POST /apis/v1/source/{orgName}/{atomName}/any/increase', () => {
    it('if owner, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/increase',
        validOwnerUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if coo, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/increase',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if cfo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/increase',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('未授权访问该资源。'));
    });

    it('if anonymous increase orders, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/increase',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new UnauthorizedException('未登录无法访问该资源。'));
    });
  });

  describe('POST /apis/v1/source/{orgName}/{atomName}/any/delete', () => {
    it('if owner, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/delete',
        validOwnerUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if coo, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/delete',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('if cfo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/delete',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('未授权访问该资源。'));
    });

    it('if anonymous delete orders, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/any/delete',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new UnauthorizedException('未登录无法访问该资源。'));
    });

    it('if anonymous has read of products, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/products/any/delete',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  describe('POST /apis/v1/tenant/any/seeds', () => {
    it('if owner, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/tenant/any/seeds',
          validOwnerUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('没有权限操作内部接口。'));
    });

    it('if coo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/tenant/any/seeds',
          validCooUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('没有权限操作内部接口。'));
    });

    it('if cfo, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/tenant/any/seeds',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('没有权限操作内部接口。'));
    });

    it('if anonymous add-to-many orders, then throw.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/tenant/any/seeds',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('没有权限操作内部接口。'));
    });
  });

  describe('if internal, always throw error.', () => {
    it('if resource type is view, then always pass.', async () => {
      await expect(
        authorizationService.validate(
          'GET',
          '/apis/v1/internal/shukun/any',
          anonymousUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('没有权限操作内部接口。'));
    });
  });

  describe('other resource type: source', () => {
    it('If coo read any source, then always pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/query',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('If coo create orders, then always pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/orders/any/create',
        validCooUserToken,
      );
      expect(output).toBeUndefined();
    });

    it('If cfo update orders, then throw error.', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/mockId/update',
          validCfoUserToken,
        ),
      ).rejects.toThrow(new ForbiddenException('未授权访问该资源。'));
    });
  });

  describe('Other org', () => {
    it('if you request shukun org name uri with b_org token, then throw', async () => {
      await expect(
        authorizationService.validate(
          'POST',
          '/apis/v1/source/shukun/orders/mockId/update',
          invalidOrgNameToken,
        ),
      ).rejects.toThrow(new ForbiddenException('您没有权限请求另一组织的接口'));
    });
  });
});
