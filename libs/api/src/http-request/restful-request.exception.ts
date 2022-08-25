export class RestfulRequestNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'RestfulRequestNotFoundError';
  }
}
