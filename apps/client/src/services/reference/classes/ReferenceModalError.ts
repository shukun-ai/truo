export class ReferenceModalError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ReferenceModalError';
  }
}
