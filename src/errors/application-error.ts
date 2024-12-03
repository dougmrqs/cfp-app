export enum ErrorCodes {
  CONFLICT = 'CONFLICT',
  BAD_REQUEST = 'BAD_REQUEST',
  UNKNOWN = 'UNKNOWN',
  NOT_FOUND = 'NOT_FOUND',
}

export class ApplicationError extends Error {
  code: string;

  constructor(code: ErrorCodes, message: string) {
    super(message)
    this.code = code
  }
}
