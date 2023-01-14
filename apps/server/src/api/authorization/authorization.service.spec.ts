import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SecurityService } from '../../identity/security.service';
import { mockEmptyDependencies } from '../../util/unit-testing/unit-testing.helper';

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
  let jwtService: JwtService;
  let securityService: SecurityService;

  beforeAll(() => {
    jwtService = new JwtService(mockEmptyDependencies());
    securityService = new SecurityService();
    authorizationService = new AuthorizationService(
      jwtService,
      securityService,
    );

    jest
      .spyOn(securityService, 'getUser')
      .mockImplementation(mockSecurityServiceGetUser);
    jest
      .spyOn(securityService, 'getRoleNames')
      .mockImplementation(mockSecurityServiceGetRoleNames);
    jest
      .spyOn(securityService, 'getGrantList')
      .mockImplementation(mockSecurityServiceGetGrantList);
    jest.spyOn(jwtService, 'verify').mockImplementation(mockJwtServiceVerify);
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

  // GET    /apis/v1/view/{orgName}/views/{viewName}
  // POST   /apis/v1/developer/{orgName}/codebase
  // POST   /apis/v1/developer/{orgName}/data-source
  // POST   /apis/v1/source/{orgName}/{atomName}/any/metadata
  // GET    /apis/v1/source/{orgName}/{atomName}/metadata

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

    it('if cfo, then throw2.', async () => {
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

    it('if anonymous has read of products, then pass.', async () => {
      const output = await authorizationService.validate(
        'POST',
        '/apis/v1/source/shukun/products/any/query',
        anonymousUserToken,
      );
      expect(output).toBeUndefined();
    });
  });

  // POST   /apis/v1/source/{orgName}/{atomName}/any/create
  // POST   /apis/v1/source/{orgName}/{atomName}/{id}/update
  // POST   /apis/v1/source/{orgName}/{atomName}/{id}/add-to-many
  // POST   /apis/v1/source/{orgName}/{atomName}/{id}/remove-from-many
  // POST   /apis/v1/source/{orgName}/{atomName}/{id}/increase
  // POST   /apis/v1/source/{orgName}/{atomName}/{id}/delete
  // POST   /apis/v1/tenant/any/seeds
  // GET    /apis/v1/public/{orgName}/roles
  // GET    /apis/v1/developer/{orgName}/inspection

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
