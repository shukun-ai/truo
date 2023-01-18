/**
 * @move to @shukun/exception
 */
export class RestfulRequestNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'RestfulRequestNotFoundError';
  }
}
