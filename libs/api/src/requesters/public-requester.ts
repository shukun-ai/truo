import {
  AuthenticationToken,
  PresenterSchema,
  RoleResourceType,
  RoleSchema,
  SystemPublicOrgModel,
  SystemUserProfile,
} from '@shukun/schema';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';
import {
  ApiResponse,
  EncryptSignInDto,
  SeedCreateDto,
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
    return await this.requestAdaptor.fetch<boolean>(
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
  public async getGrantList(
    orgName?: string,
  ): Promise<ApiResponse<RoleSchema[]>> {
    return await this.requestAdaptor.fetch(
      'GET',
      this.buildUri('grant-list', orgName),
    );
  }

  /**
   * @remarks
   * GET /apis/v1/public/{orgName}/grant-roles
   */
  public async getGrantRoles(orgName?: string): Promise<ApiResponse<string[]>> {
    return await this.requestAdaptor.fetch(
      'GET',
      this.buildUri('grant-roles', orgName),
    );
  }

  /**
   * @remarks
   * GET /apis/v1/public/{orgName}/roles
   */
  public async getRoles(orgName?: string) {
    return await this.requestAdaptor.fetch<{ name: string; label: string }[]>(
      'GET',
      this.buildUri('roles', orgName),
    );
  }

  /**
   * @remarks
   * GET /apis/v1/public/{orgName}/org
   */
  public async getOrg(orgName?: string) {
    return await this.requestAdaptor.fetch<SystemPublicOrgModel>(
      'GET',
      this.buildUri('org', orgName),
    );
  }

  /**
   * @remarks
   * POST /apis/v1/public/{orgName}/org/create
   */
  public async createOrg(dto: SeedCreateDto) {
    return await this.requestAdaptor.fetch<SystemPublicOrgModel>(
      'POST',
      this.buildUri('org/create', dto.name),
      {
        body: dto,
      },
    );
  }

  /**
   * @remarks
   * POST /apis/v1/public/{orgName}/presenters/{presenterName}
   */
  public async getPresenter(presenterName: string, orgName?: string) {
    return await this.requestAdaptor.fetch<PresenterSchema>(
      'POST',
      this.buildUri(`presenters/${presenterName}`, orgName),
    );
  }

  /**
   * @remarks
   * GET /apis/v1/public/{orgName}/profile
   */
  public async getProfile(orgName?: string) {
    return await this.requestAdaptor.fetch<SystemUserProfile | null>(
      'GET',
      this.buildUri('profile', orgName),
    );
  }

  private buildUri(suffix: string, orgName?: string) {
    return `${RoleResourceType.Public}/${orgName || ':orgName'}/${suffix}`;
  }
}
