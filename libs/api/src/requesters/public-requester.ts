import {
  AuthenticationToken,
  RoleResourceType,
  SystemPublicOrgModel,
} from '@shukun/schema';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';
import {
  ApiResponse,
  EncryptSignInDto,
  SignInDto,
} from '../request-adaptor/request-adaptor.type';

export class PublicRequester {
  constructor(private readonly requestAdaptor: IRequestAdaptor) {}

  /**
   * @remarks
   * POST /apis/v1/public/{orgName}/authentication/jwt
   */
  public async signIn(orgName: string, body: SignInDto) {
    return await this.requestAdaptor.fetch<AuthenticationToken>(
      'POST',
      this.buildUri('authentication/jwt', orgName),
      { body },
    );
  }

  /**
   * @experimental
   * @remarks
   * POST /apis/v1/public/{orgName}/authentication/jwt_encrypt
   */
  public async EncryptSignIn(orgName: string, body: EncryptSignInDto) {
    return await this.requestAdaptor.fetch<AuthenticationToken>(
      'POST',
      this.buildUri('authentication/jwt_encrypt', orgName),
      { body },
    );
  }

  /**
   * @remarks
   * GET /apis/v1/public/any/authorization/validate
   *
   * @example
   * validateAuthorization("POST", "/apis/v1/source/:orgName/system__users/any/query")
   */
  public async validateAuthorization(method: string, uri: string) {
    return await this.requestAdaptor.fetch<string[]>(
      'GET',
      this.buildUri('authorization/validate', 'any'),
      {
        headers: {
          'x-forwarded-method': method,
          'x-forwarded-uri': uri,
        },
      },
    );
  }

  /**
   * @remarks
   * GET /apis/v1/public/{orgName}/grant-list
   */
  public async getGrantList(orgName?: string) {
    return await this.requestAdaptor.fetch<string[]>(
      'GET',
      this.buildUri('grant-list', orgName),
    );
  }

  /**
   * @remarks
   * GET /apis/v1/public/{orgName}/grant-roles
   */
  public async getGrantRoles(orgName?: string) {
    return await this.requestAdaptor.fetch<string[]>(
      'GET',
      this.buildUri('grant-roles', orgName),
    );
  }

  /**
   * @remarks
   * GET /apis/v1/public/{orgName}/roles
   */
  public async getRoles(orgName?: string) {
    return await this.requestAdaptor.fetch<
      ApiResponse<{ name: string; label: string }[]>
    >('GET', this.buildUri('roles', orgName));
  }

  /**
   * @remarks
   * GET /apis/v1/public/{orgName}/org
   */
  public async getOrg(orgName?: string) {
    return await this.requestAdaptor.fetch<SystemPublicOrgModel>(
      'GET',
      this.buildUri('grant-roles', orgName),
    );
  }

  private buildUri(suffix: string, orgName?: string) {
    return `${RoleResourceType.Public}/${orgName || ':orgName'}/${suffix}`;
  }
}
