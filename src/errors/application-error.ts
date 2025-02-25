export enum ErrorCodes {
  CONFLICT = 'CONFLICT',
  BAD_REQUEST = 'BAD_REQUEST',
  UNKNOWN = 'UNKNOWN',
  NOT_FOUND = 'NOT_FOUND',
  FORBIDDEN_ACTION = 'FORBIDDEN_ACTION',
}

export class ApplicationError extends Error {
  code: string;

  constructor(code: ErrorCodes, message: string) {
    super(message)
    this.code = code
  }
}
