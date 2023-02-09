/**
 * @deprecated
 */
export function parseToken(authorization: string | undefined): string | null {
  if (!authorization) {
    return null;
  }

  const token = authorization.substring(7);

  if (token === '') {
    return null;
  }

  return token;
}
