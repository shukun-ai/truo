export interface AuthJwt {
  userId: string;
  username: string;
  orgName: string;
  orgId: string;
  tokenType: 'jwt';
  accessToken: string;
  expiresIn: number;
}
